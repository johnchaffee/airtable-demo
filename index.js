require("dotenv").config()
const apiKey = process.env.AIRTABLE_API_KEY
const baseId = process.env.AIRTABLE_BASE_ID
const tableName = "contacts"
console.log("apiKey: ", apiKey)
console.log("baseId:", baseId)
console.log("tableName:", tableName)

const Airtable = require("airtable")
const base = new Airtable({ apiKey: apiKey }).base(baseId)
const table = base(tableName)

// GET RECORDS
const getRecords = async () => {
  try {
    const records = await table
      .select({
        // maxRecords: 3,
        // view: "Grid view",
        fields: ["name", "company", "email", "phone"],
        sort: [{ field: "name", direction: "asc" }],
      })
      .firstPage()
    console.log("GET RECORDS:")
    records.forEach(function (record) {
      console.log("Retrieved", record.get("name"))
      console.log("id:", record.id)
      console.log(record.fields)
    })
  } catch (err) {
    console.error(err)
  }
}

// GET RECORD BY ID
const getRecordById = async (id) => {
  try {
    const record = await table.find(id)
    console.log("GET RECORD BY ID:", record.fields)
  } catch (err) {
    console.error(err)
  }
}

// GET RECORD BY FIRST NAME
const getRecordByName = async (firstName) => {
  try {
    const records = await table
      .select({
        // maxRecords: 3,
        filterByFormula: `(first = "${firstName}")`,
      })
      .firstPage()
    console.log("GET RECORD BY FIRST NAME:")
    records.forEach(function (record) {
      console.log("Retrieved", record.get("name"))
      console.log("id:", record.id)
      console.log(record.fields)
    })
  } catch (err) {
    console.error(err)
  }
}

// CREATE RECORD
const createRecord = async (fields) => {
  try {
    const record = await table.create(fields)
    console.log("record id:", record.id)
    console.log("record fields:", record.fields)
  } catch (err) {
    console.error(err)
  }
}

// UPDATE RECORD
// table.update is a PATCH and updates only provided values
// table.replace is an PUT and overwrites all fields, even those not provided
const updateRecord = async (id, fields) => {
  try {
    const record = await await table.update(id, fields)
    console.log("record id:", record.id)
    console.log("record fields:", record.fields)
  } catch (err) {
    console.error(err)
  }
}

// DELETE RECORD
const deleteRecord = async (id) => {
  try {
    const record = await table.destroy(id)
    console.log("record deleted:", record.id)
  } catch (err) {
    console.error(err)
  }
}

// SAMPLE OBJECTS

const newRecord = {
  first: "Tom",
  last: "Jones",
  company: "Twilo",
  notes: "My new record",
  image: [
    {
      url: "https://dl.airtable.com/.attachments/23eeb10f0e3a7227cab008cddba6306f/edfe20e5/1620941011345e1655337600vbetatLe-TVOGWtxF-bD72N6gqqe5yjw7clPwwxpqOn8FaA8M?ts=1650072651&userId=usrn5iPjnuISAI40K&cs=1c8866d3deb42add",
    },
  ],
  status: "In progress",
  phone: "+12063997777",
  email: "tom@jones.com",
}

const updatedRecord = {
  first: "Tommy",
  notes: "Updated record",
  status: "Done",
}

// RUN THE FUNCTIONS

getRecords()
// createRecord(newRecord)
// getRecordById("recD9R3zmoHZGmp0P")
// getRecordByName("John")
// updateRecord("recD9R3zmoHZGmp0P", updatedRecord)
// deleteRecord("reca07YbQoQDaogLw")
