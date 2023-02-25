(ns metabase-enterprise.serialization.v2.storage.yaml
  (:require
   [clojure.java.io :as io]
   [metabase-enterprise.serialization.dump :as v1-dump]
   [metabase-enterprise.serialization.v2.utils.yaml :as u.yaml]
   [metabase.models.serialization.base :as serdes.base]
   [metabase.util.i18n :refer [trs]]
   [metabase.util.log :as log]))

(defn store!
  "Serializes stream of entities to given directory"
  [entities root-dir]
  (let [context (serdes.base/storage-base-context)
        settings (atom [])]
    (doseq [{metadata :serdes/meta :as entity} entities]
      (if (= "Setting" (-> metadata last :model))
        (swap! settings conj entity)
        (let [file (u.yaml/entity-file root-dir context entity)]
          (log/info (trs "Storing entity {0}" (u.yaml/log-path-str metadata)))
          (v1-dump/spit-yaml file (dissoc entity :serdes/meta)))))
    (log/info (trs "Storing settings"))
    (v1-dump/spit-yaml (io/file root-dir "settings.yaml")
                       (into (sorted-map) (map (juxt :key :value) @settings)))))
