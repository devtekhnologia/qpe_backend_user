import { query } from './database';

interface ColumnData {
  [key: string]: any;
}

interface QueryResult {
  rows: ColumnData[];
}

interface DynamicRecord {
  [key: string]: any;
}

interface GetDetailsWithDynamicQueryParams {
  firstTable: string;
  firstColumn: string;
  firstColumnValue: number;
  secondTable: string;
  secondColumn: string;
  secondColumnToMatch: string;
  columnToRetrieve: string;
}


export async function getColumnValueById(
  tableName: string,
  columnName: string,
  conditionColumn: string,  // 'school_id' will be passed as conditionColumn
  recordId: number
): Promise<any> {
  try {
    // Construct the SQL query with the correct placeholder syntax for MySQL
    const queryText = `SELECT ${columnName} FROM ${tableName} WHERE ${conditionColumn} = ?`;

    // Query the database to get the row by school_id for the specific table
    const result = await query(queryText, [recordId]);

    // Assert the result is an array of rows
    const queryResult: QueryResult = { rows: result as unknown as ColumnData[] };

    // Check if we received any result
    if (queryResult.rows.length > 0) {
      return queryResult.rows[0][columnName];  // Return the value of the specified column
    } else {
      console.warn(`No rows found for condition ${conditionColumn} = ${recordId}`);
      return undefined;  // If no result found, return undefined
    }
  } catch (error) {
    console.error('Error retrieving column value:', error);
    throw new Error('Failed to retrieve column value.');
  }
}

export async function getDynamicNames(
  firstColumnValue: number,            // The first column value (e.g., class_id)
  secondColumnValue: number,           // The second column value (e.g., div_id)
  firstTable: string,                  // The first table name (e.g., 'classes')
  secondTable: string,                 // The second table name (e.g., 'divisions')
  firstColumnName: string,             // The column name for the first column (e.g., 'class_id')
  secondColumnName: string,            // The column name for the second column (e.g., 'div_id')
  firstNameColumn: string,             // The column for the first name (e.g., 'class_name')
  secondNameColumn: string            // The column for the second name (e.g., 'div_name')
): Promise<string | null> {
  try {
    // Step 1: Get the first name from the first table using firstColumnValue
    const firstQuery = `
      SELECT ${firstNameColumn}
      FROM ${firstTable}
      WHERE ${firstColumnName} = ?;
    `;

    const firstResult: DynamicRecord[] = await query(firstQuery, [firstColumnValue]);

    if (firstResult.length === 0) {
      return null;  // No result found for the first table
    }

    const first_name = firstResult[0][firstNameColumn];  // Get the first name

    // Step 2: Get the second name from the second table using secondColumnValue
    const secondQuery = `
      SELECT ${secondNameColumn}
      FROM ${secondTable}
      WHERE ${secondColumnName} = ?;
    `;

    const secondResult: DynamicRecord[] = await query(secondQuery, [secondColumnValue]);

    if (secondResult.length === 0) {
      return null;  // No result found for the second table
    }

    const second_name = secondResult[0][secondNameColumn];  // Get the second name

    // Step 3: Return the concatenated names
    return `${first_name} - ${second_name}`;

  } catch (error: unknown) {
    console.error('Error executing query:', error);
    return null;
  }
}

export async function getDynamicNamesFromThreeTables(
  firstTable: string,                // The first table name (e.g., 'table1')
  firstRecordId: number,             // The ID to search in the first table
  firstRecordIdColumn: string,       // The name of the ID column in the first table
  firstColumn1Name: string,          // The name of the first column in the first table
  firstColumn2Name: string,          // The name of the second column in the first table
  secondTable: string,               // The second table name (e.g., 'table2')
  secondRecordIdColumn: string,      // The name of the ID column in the second table
  secondColumnName: string,          // The name of the column to extract from the second table
  thirdTable: string,                // The third table name (e.g., 'table3')
  thirdRecordIdColumn: string,       // The name of the ID column in the third table
  thirdColumnName: string           // The name of the column to extract from the third table
): Promise<string | null> {
  try {
    // Step 1: Get the two column values from the first table using firstRecordId
    const firstQuery = `
      SELECT ${firstColumn1Name}, ${firstColumn2Name}
      FROM ${firstTable}
      WHERE ${firstRecordIdColumn} = ?;
    `;
    const firstResult: DynamicRecord[] = await query(firstQuery, [firstRecordId]);

    if (firstResult.length === 0) {
      return null;  // No result found for the first table
    }

    const firstColumn1Value = firstResult[0][firstColumn1Name];  // Get the first column value
    const firstColumn2Value = firstResult[0][firstColumn2Name];  // Get the second column value

    // Step 2: Use the first column value to get the corresponding value from the second table
    const secondQuery = `
      SELECT ${secondColumnName}
      FROM ${secondTable}
      WHERE ${secondRecordIdColumn} = ?;
    `;
    const secondResult: DynamicRecord[] = await query(secondQuery, [firstColumn1Value]);

    if (secondResult.length === 0) {
      return null;  // No result found for the second table
    }

    const secondColumnValue = secondResult[0][secondColumnName];  // Get the extracted column value from the second table

    // Step 3: Use the second column value from the first table (firstColumn2Value) to get the value from the third table
    const thirdQuery = `
      SELECT ${thirdColumnName}
      FROM ${thirdTable}
      WHERE ${thirdRecordIdColumn} = ?;
    `;
    const thirdResult: DynamicRecord[] = await query(thirdQuery, [firstColumn2Value]);  // Using firstColumn2Value for third table query

    if (thirdResult.length === 0) {
      return null;  // No result found for the third table
    }

    const thirdColumnValue = thirdResult[0][thirdColumnName];  // Get the extracted column value from the third table

    // Step 4: Concatenate the values from the second and third tables
    return `${secondColumnValue} - ${thirdColumnValue}`;

  } catch (error: unknown) {
    console.error('Error executing query:', error);
    return null;
  }
}

export async function getDetailsWithDynamicQuery(
  params: GetDetailsWithDynamicQueryParams
): Promise<string | null> {
  try {
    const {
      firstTable,
      firstColumn,
      firstColumnValue,
      secondTable,
      secondColumn,
      secondColumnToMatch,
      columnToRetrieve
    } = params;

    const firstQuery = `
      SELECT ${secondColumn}
      FROM ${firstTable}
      WHERE ${firstColumn} = ?;
    `;
    const firstResult: DynamicRecord[] = await query(firstQuery, [firstColumnValue]);

    if (firstResult.length === 0) {
      return null;
    }

    const associatedValue = firstResult[0][secondColumn];

    const secondQuery = `
      SELECT ${columnToRetrieve}
      FROM ${secondTable}
      WHERE ${secondColumnToMatch} = ?;
    `;
    const secondResult: DynamicRecord[] = await query(secondQuery, [associatedValue]);

    if (secondResult.length === 0) {
      return null;
    }

    const retrievedValue = secondResult[0][columnToRetrieve];
    return `${retrievedValue}`;

  } catch (error: unknown) {
    console.error('Error executing query:', error);
    return null;
  }
}

export const getColumnValuesString = async (
  tableName: string,
  columnName: string,
  idColumn: string,
  ids: number[]
): Promise<string> => {
  const values: string[] = [];
  for (const id of ids) {
    // Fetch value using the getColumnValueById function
    const value = await getColumnValueById(tableName, columnName, idColumn, id);

    if (value) {
      values.push(value);  // Add the value to the array
    } else {
      console.log(`${idColumn} ID: ${id} not found in ${tableName}`);
    }
  }

  // Return the joined values as a string
  return values.join(', ');
};




