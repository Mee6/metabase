export const many_data_types_data = [
  {
    uuid: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
    integer: 1,
    integerUnsigned: 2,
    tinyint: -128,
    tinyint1: 1,
    smallint: 100,
    mediumint: 1000,
    bigint: 100000,
    string: "string",
    text: "text",
    float: 1.1,
    double: 1.11,
    decimal: 1.11,
    boolean: true,
    date: "2020-01-01",
    datetime: "2020-01-01 00:00:00",
    datetimeTZ: "2020-01-01 00:00:00",
    time: "00:00:00",
    timestamp: "2020-01-01 00:00:00",
    timestampTZ: "2020-01-01 00:00:00",
    json: { a: 10, b: 20, c: [6, 7, 8], d: "foobar" },
    jsonb: { a: 20, b: 30 },
    enum: "beta",
    binary: "binary",
  },
  {
    uuid: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12",
    integer: 4,
    integerUnsigned: 5,
    tinyint: 127,
    tinyint1: 1,
    smallint: 100,
    mediumint: 1002,
    bigint: 100002,
    string: "string of characters",
    text: "text block",
    float: 21.1,
    double: 21.11,
    decimal: 21.11,
    boolean: false,
    date: "2020-02-01",
    datetime: "2020-02-01 12:30:30",
    datetimeTZ: "2020-02-01 12:30:30",
    time: "12:30:30",
    timestamp: "2020-02-01 12:30:30",
    timestampTZ: "2020-02-01 12:30:30",
    json: { a: 10, b: 20, c: [9, 10, 11], d: "foobarbaz" },
    jsonb: { a: 20, b: 30 },
    enum: "beta",
    binary: "binary",
  },
];
