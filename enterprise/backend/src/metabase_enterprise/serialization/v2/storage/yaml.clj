(ns metabase-enterprise.serialization.v2.storage.yaml
  (:require
   [clojure.java.io :as io]
   [clojure.string :as str]
   [metabase-enterprise.serialization.v2.utils.yaml :as u.yaml]
   [metabase.models.serialization.base :as serdes.base]
   [metabase.util.date-2 :as u.date]
   [metabase.util.log :as log]
   [yaml.core :as yaml]
   [yaml.writer :as y.writer])
  (:import
   (java.time.temporal Temporal)))

(extend-type Temporal y.writer/YAMLWriter
             (encode [data]
               (u.date/format data)))

(defn- spit-yaml [file data]
  (io/make-parents file)
  (spit file (yaml/generate-string (into (sorted-map) data)
                                   :dumper-options {:flow-style  :block
                                                    :split-lines false})))

(defn store!
  "Serializes stream of entities to given directory"
  [entities root-dir]
  (let [context (serdes.base/storage-base-context)
        settings (atom [])]
    (doseq [entity entities]
      (if (-> entity :serdes/meta last :model (= "Setting"))
        (swap! settings conj entity)
        (let [file (apply io/file root-dir (u.yaml/hierarchy->path-components context entity))]
          (log/info "Storing"
                    (if (= :full (:type entity)) "data:" "metadata:")
                    ;; friendlier description of what we're exporting
                    (->> entity :serdes/meta (map (comp (partial str/join "#") (juxt :model :id))) (str/join "/")))
          (spit-yaml file (dissoc entity :serdes/meta)))))
    (log/info "Storing settings")
    (spit-yaml (io/file root-dir "settings.yaml")
               (map (juxt :key :value) @settings))))
