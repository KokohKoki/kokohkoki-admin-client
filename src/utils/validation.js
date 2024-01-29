import * as Yup from "yup";

export const fishFormSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  gender: Yup.string().required("Gender is required"),
  type: Yup.string().required("Type is required"),
  price: Yup.number().positive("Price must be in number").required("Price is required"),
  price_usd: Yup.number().positive("Price USD must be in number").required("Price USD is required"),
  discountPercentage: Yup.number().positive("Discount Percentage must be in number").required("Price USD is required"),
});
