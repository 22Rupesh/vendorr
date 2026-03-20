const express = require("express");
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const { dbConfig } = require("./config");

const app = express();
app.use(express.json());
app.use(cors());

const pool = new Pool(dbConfig);

// -----------------------------------------
// SIGNUP API
// -----------------------------------------
app.post("/signup", async (req, res) => {
    const { username, password, mobile, email } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query(
            `INSERT INTO "Users" ("Username", "PasswordHash", "Mobile", "Email")
             VALUES ($1, $2, $3, $4)`,
            [username, hashedPassword, mobile, email]
        );

        res.json({ message: "Signup successful!" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// -----------------------------------------
// LOGIN API
// -----------------------------------------
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await pool.query(`SELECT * FROM "Users" WHERE "Username" = $1`, [username]);

        if (result.rows.length === 0) {
            return res.status(400).json({ message: "User not found" });
        }

        const user = result.rows[0];
        const valid = await bcrypt.compare(password, user.PasswordHash);

        if (!valid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        res.json({ message: "Login successful!" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// -----------------------------------------
// RESET PASSWORD API
// -----------------------------------------
app.post("/reset-password", async (req, res) => {
    const { username, newPassword } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await pool.query(
            `UPDATE "Users" SET "PasswordHash" = $1 
             WHERE "Username" = $2`,
            [hashedPassword, username]
        );

        res.json({ message: "Password reset successful!" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/product/add", async (req, res) => {
  const { productName, quantity, price } = req.body;

  try {
    await pool.query(
      `INSERT INTO "Products" ("ProductName", "Quantity", "Price")
       VALUES ($1, $2, $3)`,
      [productName, quantity, price]
    );

    res.json({ message: "Product added successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/product/list", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT "ProductId", "ProductName", "Quantity", "Price"
       FROM "Products"
       ORDER BY "ProductId" DESC`
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/product/update", async (req, res) => {
  const { productId, productName, quantity, price } = req.body;

  try {
    await pool.query(
      `UPDATE "Products"
       SET "ProductName" = $1, "Quantity" = $2, "Price" = $3
       WHERE "ProductId" = $4`,
      [productName, quantity, price, productId]
    );

    res.json({ message: "Product updated successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/product/delete/:id", async (req, res) => {
  const productId = req.params.id;

  try {
    await pool.query(`DELETE FROM "Products" WHERE "ProductId" = $1`, [productId]);

    res.json({ message: "Product deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/product/increase", async (req, res) => {
  const { productId } = req.body;

  try {
    await pool.query(
      `UPDATE "Products"
       SET "Quantity" = "Quantity" + 1
       WHERE "ProductId" = $1`,
      [productId]
    );

    res.json({ message: "Quantity increased!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/product/decrease", async (req, res) => {
  const { productId } = req.body;

  try {
    await pool.query(
      `UPDATE "Products"
       SET "Quantity" = CASE 
         WHEN "Quantity" > 0 THEN "Quantity" - 1 
         ELSE 0 
       END
       WHERE "ProductId" = $1`,
      [productId]
    );

    res.json({ message: "Quantity decreased!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -----------------------------------------
// vendor page
// -----------------------------------------

app.post("/vendor/add", async (req, res) => {
  const { name, email, pan, mobile } = req.body;

  try {
    await pool.query(
      `INSERT INTO "Vendors" ("Name", "Email", "PAN", "Mobile")
       VALUES ($1, $2, $3, $4)`,
      [name, email, pan, mobile]
    );

    res.json({ message: "Vendor added successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/vendor/list", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT "VendorId", "Name", "Email", "PAN", "Mobile"
       FROM "Vendors"
       ORDER BY "VendorId" DESC`
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/vendor/update", async (req, res) => {
  const { vendorId, name, email, pan, mobile } = req.body;

  try {
    await pool.query(
      `UPDATE "Vendors"
       SET "Name" = $1, "Email" = $2, "PAN" = $3, "Mobile" = $4
       WHERE "VendorId" = $5`,
      [name, email, pan, mobile, vendorId]
    );

    res.json({ message: "Vendor updated successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/vendor/delete/:id", async (req, res) => {
  const vendorId = req.params.id;

  try {
    await pool.query(
      `DELETE FROM "Vendors"
       WHERE "VendorId" = $1`,
      [vendorId]
    );

    res.json({ message: "Vendor deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/vendor/details/:id", async (req, res) => {
  const vendorId = req.params.id;

  try {
    // Vendor basic info
    const vendor = await pool.query(`SELECT * FROM "Vendors" WHERE "VendorId" = $1`, [vendorId]);

    // Vendor transaction details
    const transactions = await pool.query(
      `SELECT VT."TransactionId", P."ProductName", VT."Quantity", VT."Price",
              VT."TotalAmount", VT."PaidAmount", VT."Balance"
       FROM "VendorTransactions" VT
       JOIN "Products" P ON VT."ProductId" = P."ProductId"
       WHERE VT."VendorId" = $1
       ORDER BY VT."TransactionId" DESC`,
      [vendorId]
    );

    res.json({
      vendor: vendor.rows[0],
      transactions: transactions.rows
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/vendor/transaction/add", async (req, res) => {
  const { vendorId, productId, quantity, price, paidAmount } = req.body;

  try {
    await pool.query(
      `INSERT INTO "VendorTransactions" ("VendorId", "ProductId", "Quantity", "Price", "PaidAmount")
       VALUES ($1, $2, $3, $4, $5)`,
      [vendorId, productId, quantity, price, paidAmount]
    );

    res.json({ message: "Vendor transaction added successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -----------------------------------------
// START SERVER
// -----------------------------------------
app.listen(5000, () => {
    console.log("Server running on port 5000...");
});
