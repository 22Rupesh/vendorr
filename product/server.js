const express = require("express");
const sql = require("mssql");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const { dbConfig } = require("./config");

const app = express();
app.use(express.json());
app.use(cors());

// -----------------------------------------
// SIGNUP API
// -----------------------------------------
app.post("/signup", async (req, res) => {
    const { username, password, mobile, email } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        let pool = await sql.connect(dbConfig);

        await pool.request()
            .input("username", sql.NVarChar, username)
            .input("password", sql.NVarChar, hashedPassword)
            .input("mobile", sql.NVarChar, mobile)
            .input("email", sql.NVarChar, email)
            .query(`
                INSERT INTO Users (Username, PasswordHash, Mobile, Email)
                VALUES (@username, @password, @mobile, @email)
            `);

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
        let pool = await sql.connect(dbConfig);

        const result = await pool.request()
            .input("username", sql.NVarChar, username)
            .query("SELECT * FROM Users WHERE Username = @username");

        if (result.recordset.length === 0) {
            return res.status(400).json({ message: "User not found" });
        }

        const user = result.recordset[0];
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

        let pool = await sql.connect(dbConfig);

        await pool.request()
            .input("username", sql.NVarChar, username)
            .input("password", sql.NVarChar, hashedPassword)
            .query(`
                UPDATE Users SET PasswordHash = @password 
                WHERE Username = @username
            `);

        res.json({ message: "Password reset successful!" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/product/add", async (req, res) => {
  const { productName, quantity, price } = req.body;

  try {
    let pool = await sql.connect(dbConfig);

    await pool.request()
      .input("name", sql.NVarChar, productName)
      .input("qty", sql.Int, quantity)
      .input("price", sql.Decimal(10, 2), price)
      .query(`
        INSERT INTO Products (ProductName, Quantity, Price)
        VALUES (@name, @qty, @price)
      `);

    res.json({ message: "Product added successfully!" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/product/list", async (req, res) => {
  try {
    let pool = await sql.connect(dbConfig);

    const result = await pool.request().query(`
      SELECT ProductId, ProductName, Quantity, Price
      FROM Products
      ORDER BY ProductId DESC
    `);

    res.json(result.recordset);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/product/update", async (req, res) => {
  const { productId, productName, quantity, price } = req.body;

  try {
    let pool = await sql.connect(dbConfig);

    await pool.request()
      .input("id", sql.Int, productId)
      .input("name", sql.NVarChar, productName)
      .input("qty", sql.Int, quantity)
      .input("price", sql.Decimal(10, 2), price)
      .query(`
        UPDATE Products
        SET ProductName = @name, Quantity = @qty, Price = @price
        WHERE ProductId = @id
      `);

    res.json({ message: "Product updated successfully!" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



app.delete("/product/delete/:id", async (req, res) => {
  const productId = req.params.id;

  try {
    let pool = await sql.connect(dbConfig);

    await pool.request()
      .input("id", sql.Int, productId)
      .query(`DELETE FROM Products WHERE ProductId = @id`);

    res.json({ message: "Product deleted successfully!" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});







app.put("/product/increase", async (req, res) => {
  const { productId } = req.body;

  try {
    let pool = await sql.connect(dbConfig);

    await pool.request()
      .input("id", sql.Int, productId)
      .query(`
        UPDATE Products
        SET Quantity = Quantity + 1
        WHERE ProductId = @id
      `);

    res.json({ message: "Quantity increased!" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});







app.put("/product/decrease", async (req, res) => {
  const { productId } = req.body;

  try {
    let pool = await sql.connect(dbConfig);

    await pool.request()
      .input("id", sql.Int, productId)
      .query(`
        UPDATE Products
        SET Quantity = CASE 
          WHEN Quantity > 0 THEN Quantity - 1 
          ELSE 0 
        END
        WHERE ProductId = @id
      `);

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
    let pool = await sql.connect(dbConfig);

    await pool.request()
      .input("name", sql.NVarChar, name)
      .input("email", sql.NVarChar, email)
      .input("pan", sql.NVarChar, pan)
      .input("mobile", sql.NVarChar, mobile)
      .query(`
        INSERT INTO Vendors (Name, Email, PAN, Mobile)
        VALUES (@name, @email, @pan, @mobile)
      `);

    res.json({ message: "Vendor added successfully!" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



app.get("/vendor/list", async (req, res) => {
  try {
    let pool = await sql.connect(dbConfig);

    const result = await pool.request().query(`
      SELECT VendorId, Name, Email, PAN, Mobile
      FROM Vendors
      ORDER BY VendorId DESC
    `);

    res.json(result.recordset);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




app.put("/vendor/update", async (req, res) => {
  const { vendorId, name, email, pan, mobile } = req.body;

  try {
    let pool = await sql.connect(dbConfig);

    await pool.request()
      .input("id", sql.Int, vendorId)
      .input("name", sql.NVarChar, name)
      .input("email", sql.NVarChar, email)
      .input("pan", sql.NVarChar, pan)
      .input("mobile", sql.NVarChar, mobile)
      .query(`
        UPDATE Vendors
        SET Name = @name, Email = @email, PAN = @pan, Mobile = @mobile
        WHERE VendorId = @id
      `);

    res.json({ message: "Vendor updated successfully!" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});





app.delete("/vendor/delete/:id", async (req, res) => {
  const vendorId = req.params.id;

  try {
    let pool = await sql.connect(dbConfig);

    await pool.request()
      .input("id", sql.Int, vendorId)
      .query(`
        DELETE FROM Vendors
        WHERE VendorId = @id
      `);

    res.json({ message: "Vendor deleted successfully!" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});







app.get("/vendor/details/:id", async (req, res) => {
  const vendorId = req.params.id;

  try {
    let pool = await sql.connect(dbConfig);

    // Vendor basic info
    const vendor = await pool.request()
      .input("id", sql.Int, vendorId)
      .query("SELECT * FROM Vendors WHERE VendorId = @id");

    // Vendor transaction details
    const transactions = await pool.request()
      .input("id", sql.Int, vendorId)
      .query(`
        SELECT VT.TransactionId, P.ProductName, VT.Quantity, VT.Price,
               VT.TotalAmount, VT.PaidAmount, VT.Balance
        FROM VendorTransactions VT
        JOIN Products P ON VT.ProductId = P.ProductId
        WHERE VT.VendorId = @id
        ORDER BY VT.TransactionId DESC
      `);

    res.json({
      vendor: vendor.recordset[0],
      transactions: transactions.recordset
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});





app.post("/vendor/transaction/add", async (req, res) => {
  const { vendorId, productId, quantity, price, paidAmount } = req.body;

  try {
    let pool = await sql.connect(dbConfig);

    await pool.request()
      .input("vendorId", sql.Int, vendorId)
      .input("productId", sql.Int, productId)
      .input("qty", sql.Int, quantity)
      .input("price", sql.Decimal(10, 2), price)
      .input("paid", sql.Decimal(10, 2), paidAmount)
      .query(`
        INSERT INTO VendorTransactions (VendorId, ProductId, Quantity, Price, PaidAmount)
        VALUES (@vendorId, @productId, @qty, @price, @paid)
      `);

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
