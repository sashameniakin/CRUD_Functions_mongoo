import connectDB from "../_db/connect-db";
import { Product } from "../_db/models/Product";

async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        const product = await Product.findById(req.query.productId);
        if (product) {
          return res.status(200).json(product);
        } else {
          return res.status(404).json({ error: "product not found" });
        }
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    case "DELETE":
      try {
        /* const productDel = await  */ Product.findByIdAndDelete(
          req.query.productId,
          function (err) {
            if (err) console.log(err);
            console.log("Successful deletion");
          }
        );

        return res.status(200).end();
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }

    default:
      return res.status(400).json({ error: "method not supported" });
  }
}

export default connectDB(handler);
