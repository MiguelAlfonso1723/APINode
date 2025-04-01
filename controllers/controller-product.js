import {
  Product,
  ElectronicsProduct,
  FoodProduct,
  AutomotiveProduct,
  ClothingProduct,
} from "../models/product.mjs";
import Company from "../models/company.mjs";
import jwt from "jsonwebtoken";

const key = secrets.SECRET;

function validate(aux) {
  let token = aux;
  if (token != undefined) {
    token = aux.split(" ")[1];

    const payload = jwt.verify(token, key);
    if (Date.now() > payload.exp) {
      return "Session Expired";
    } else {
      return true;
    }
  } else {
    return "The session has not been logged in or the token has not been entered.";
  }
}

async function getAll(req, res) {
  try {
    const token = req.headers.authorization;
    const valid = validate(token);
    if (valid == true) {
      const result = await Product.find({});
      return res.status(200).json({ state: true, data: result });
    } else {
      return res.status(401).json({ error: valid });
    }
  } catch (err) {
    return res.status(500).json({ state: false, message: err.mesagge });
  }
}

async function getById(req, res) {
  const { id } = req.params;
  try {
    const token = req.headers.authorization;
    const valid = validate(token);
    if (valid == true) {
      const result = await Product.findById(id);
      return res.status(200).json({ state: true, data: result });
    } else {
      return res.status(401).json({ error: valid });
    }
  } catch (err) {
    return res.status(500).json({ state: false, error: err.message });
  }
}

async function save(req, res) {
  const { id } = req.params;
  try {
    const token = req.headers.authorization;
    const valid = validate(token);
    if (valid == true) {
      const company = await Company.findById(id);
      if (company) {
        let product = new Product(req.body);
        switch (company.numberIndustry) {
          case 1:
            product = new ElectronicsProduct(req.body);
            break;
          case 2:
            product = new FoodProduct(req.body);
            break;
          case 3:
            product = new AutomotiveProduct(req.body);
            break;
          case 4:
            product = new ClothingProduct(req.body);
            break;
          default:
            console.log(
              "No se encuentra el tipo de producto, se dejará en la clase base"
            );
            break;
        }

        company.products.push(product);

        await company.save();
        product.company = company;
        const result = await product.save();

        return res.status(201).json({ state: true, data: result });
      } else {
        return res.status(404).json({ state: false, message: "ID Company Not Found", data: null });
      }
    } else {
      return res.status(401).json({ error: valid });
    }
  } catch (err) {
    return res.status(500).json({ state: false, message: err.message });
  }
}

async function eliminate(req, res) {
  const { id } = req.params;
  try {
    const token = req.headers.authorization;
    const valid = validate(token);
    if (valid == true) {
      const product = await Product.findById(id);
      if (product) {
        const company = await Company.findById(product.company._id);
        for (let i = 0; i < company.products.length; i++) {
          if (company.products[i].toString() == id) {
            company.products.splice(i, 1);
            await company.save();
          }
        }
        const result = await product.deleteOne();
        return res.status(200).json({ state: true, data: result });
      } else {
        return res
          .status(404)
          .json({ state: false, message: "ID Company Not Found", data: null });
      }
    } else {
      return res.status(401).json({ error: valid });
    }
  } catch (err) {
    return res.status(500).json({ state: false, message: err.message });
  }
}

async function actualize(req, res) {
  const { id } = req.params;
  try {
    const token = req.headers.authorization;
    const valid = validate(token);
    if (valid == true) {
      const product = await Product.findById(id);

      if (product) {
        const company = await Company.findById(product.company._id);

        let productN = new Product(req.body);

        switch (company.numberIndustry) {
          case 1:
            productN = new ElectronicsProduct(req.body);
            break;
          case 2:
            productN = new FoodProduct(req.body);
            break;
          case 3:
            productN = new AutomotiveProduct(req.body);
            break;
          case 4:
            productN = new ClothingProduct(req.body);
            break;
          default:
            console.log(
              "No se encuentra el tipo de producto, se dejará en la clase base"
            );
            break;
        }

        productN.company = company;

        await product.overwrite(productN);

        const result = await product.save();

        return res.status(201).json({ state: true, data: result });
      } else {
        return res
          .status(404)
          .json({ state: false, message: "ID Company Not Found", data: null });
      }
    } else {
      return res.status(401).json({ error: valid });
    }
  } catch (err) {
    return res.status(500).json({ state: false, message: err.message });
  }
}

export { getAll, save, getById, eliminate, actualize };
