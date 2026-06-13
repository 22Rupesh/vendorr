require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(express.json());
app.use(cors());

const supabaseUrl = process.env.SUPABASE_URL || "https://ceypeioqppalchqylbkm.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function init() {
  const { error } = await supabase.rpc("get_service_status").maybeSingle();
  if (error && error.code !== "PGRST116") {
    console.log("Supabase connected (REST API)");
  } else {
    console.log("Supabase connected (REST API)");
  }
}

app.post("/signup", async (req, res) => {
    const { username, password, mobile, email } = req.body;
    try {
        const { data: existing } = await supabase.from("Users").select("UserId").eq("Username", username).maybeSingle();
        if (existing) return res.status(400).json({ error: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const { error } = await supabase.from("Users").insert({
            Username: username, PasswordHash: hashedPassword, Mobile: mobile, Email: email
        });
        if (error) throw error;
        res.json({ message: "Signup successful!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const { data: user } = await supabase.from("Users").select("*").eq("Username", username).maybeSingle();
        if (!user) return res.status(400).json({ message: "User not found" });

        const valid = await bcrypt.compare(password, user.PasswordHash);
        if (!valid) return res.status(400).json({ message: "Invalid password" });

        res.json({ message: "Login successful!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/reset-password", async (req, res) => {
    const { username, newPassword } = req.body;
    try {
        const { data: user } = await supabase.from("Users").select("UserId").eq("Username", username).maybeSingle();
        if (!user) return res.status(400).json({ error: "User not found" });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const { error } = await supabase.from("Users").update({ PasswordHash: hashedPassword }).eq("Username", username);
        if (error) throw error;
        res.json({ message: "Password reset successful!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/product/add", async (req, res) => {
    const { productName, quantity, price } = req.body;
    try {
        const { error } = await supabase.from("Products").insert({
            ProductName: productName, Quantity: Number(quantity), Price: Number(price)
        });
        if (error) throw error;
        res.json({ message: "Product added successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/product/list", async (req, res) => {
    try {
        const { data, error } = await supabase.from("Products").select("*").order("ProductId", { ascending: false });
        if (error) throw error;
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put("/product/update", async (req, res) => {
    const { productId, productName, quantity, price } = req.body;
    try {
        const { error } = await supabase.from("Products").update({
            ProductName: productName, Quantity: Number(quantity), Price: Number(price)
        }).eq("ProductId", Number(productId));
        if (error) throw error;
        res.json({ message: "Product updated successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete("/product/delete/:id", async (req, res) => {
    try {
        const { error } = await supabase.from("Products").delete().eq("ProductId", Number(req.params.id));
        if (error) throw error;
        res.json({ message: "Product deleted successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put("/product/increase", async (req, res) => {
    const { productId } = req.body;
    try {
        const { data: p } = await supabase.from("Products").select("Quantity").eq("ProductId", Number(productId)).single();
        if (!p) return res.status(404).json({ error: "Product not found" });
        const { error } = await supabase.from("Products").update({ Quantity: p.Quantity + 1 }).eq("ProductId", Number(productId));
        if (error) throw error;
        res.json({ message: "Quantity increased!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put("/product/decrease", async (req, res) => {
    const { productId } = req.body;
    try {
        const { data: p } = await supabase.from("Products").select("Quantity").eq("ProductId", Number(productId)).single();
        if (!p) return res.status(404).json({ error: "Product not found" });
        const { error } = await supabase.from("Products").update({ Quantity: Math.max(0, p.Quantity - 1) }).eq("ProductId", Number(productId));
        if (error) throw error;
        res.json({ message: "Quantity decreased!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/vendor/add", async (req, res) => {
    const { name, email, pan, mobile } = req.body;
    try {
        const { error } = await supabase.from("Vendors").insert({ Name: name, Email: email, PAN: pan, Mobile: mobile });
        if (error) throw error;
        res.json({ message: "Vendor added successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/vendor/list", async (req, res) => {
    try {
        const { data, error } = await supabase.from("Vendors").select("*").order("VendorId", { ascending: false });
        if (error) throw error;
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put("/vendor/update", async (req, res) => {
    const { vendorId, name, email, pan, mobile } = req.body;
    try {
        const { error } = await supabase.from("Vendors").update({ Name: name, Email: email, PAN: pan, Mobile: mobile }).eq("VendorId", Number(vendorId));
        if (error) throw error;
        res.json({ message: "Vendor updated successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete("/vendor/delete/:id", async (req, res) => {
    try {
        const { error } = await supabase.from("Vendors").delete().eq("VendorId", Number(req.params.id));
        if (error) throw error;
        res.json({ message: "Vendor deleted successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/vendor/details/:id", async (req, res) => {
    try {
        const { data: vendor } = await supabase.from("Vendors").select("*").eq("VendorId", Number(req.params.id)).single();
        if (!vendor) return res.status(404).json({ error: "Vendor not found" });

        const { data: transactions } = await supabase
            .from("VendorTransactions")
            .select(`TransactionId, Quantity, Price, TotalAmount, PaidAmount, Balance, Products(ProductName)`)
            .eq("VendorId", Number(req.params.id))
            .order("TransactionId", { ascending: false });

        res.json({
            vendor,
            transactions: (transactions || []).map(t => ({
                ...t, ProductName: t.Products?.ProductName || "Unknown", Products: undefined
            }))
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/vendor/transaction/add", async (req, res) => {
    const { vendorId, productId, quantity, price, paidAmount } = req.body;
    try {
        const totalAmount = Number(quantity) * Number(price);
        const balance = totalAmount - Number(paidAmount || 0);
        const { error } = await supabase.from("VendorTransactions").insert({
            VendorId: Number(vendorId), ProductId: Number(productId),
            Quantity: Number(quantity), Price: Number(price),
            TotalAmount: totalAmount, PaidAmount: Number(paidAmount || 0), Balance: balance
        });
        if (error) throw error;
        res.json({ message: "Vendor transaction added successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/sale/list", async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("VendorTransactions")
            .select(`TransactionId, Quantity, Price, TotalAmount, PaidAmount, Balance, Products(ProductName), Vendors(Name)`)
            .order("TransactionId", { ascending: false });
        if (error) throw error;
        res.json((data || []).map(t => ({
            ...t,
            ProductName: t.Products?.ProductName || "Unknown",
            VendorName: t.Vendors?.Name || "Unknown",
            Products: undefined,
            Vendors: undefined
        })));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/data", async (req, res) => {
    try {
        const tables = ["Users", "Products", "Vendors", "VendorTransactions"];
        const result = {};
        for (const table of tables) {
            const { data } = await supabase.from(table).select("*").limit(100);
            result[table] = data || [];
        }
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

init().then(() => {
  app.listen(5000, () => {
      console.log("Server running on port 5000...");
  });
}).catch(err => {
  console.error("Init error:", err.message || err);
  process.exit(1);
});
