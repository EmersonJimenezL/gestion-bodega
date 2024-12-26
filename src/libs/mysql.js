import mysql from "serverless-mysql";

export const pool = mysql({
  config: {
    // host: "192.168.0.193",
    host: "127.0.0.1",
    user: "Galut_Rendich",
    password: "Gestion-Bodega-2",
    port: "3306",
    database: "gestionbodega",
  },
});

export async function query(sql, values) {
  try {
    const results = await pool.query(sql, values);
    await pool.end();
    return results;
  } catch (e) {
    throw Error(e.message);
  }
}
