import * as Yup from "yup";

export const fishFormSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  gender: Yup.string().required("Gender is required"),
  type: Yup.string().required("Type is required"),
  price: Yup.number().positive("Price must be in number").required("Price is required"),
  price_usd: Yup.number().positive("Price USD must be in number").required("Price USD is required"),
  discountPercentage: Yup.number()
  .max(100, "Discount Percentage cannot exceed 100%")
});


export const couponFormSchema = Yup.object().shape({
  discountPercentage: Yup.number()
    .min(1, "Discount Percentage must be at least 1%")
    .max(100, "Discount Percentage cannot exceed 100%")
    .required("Discount Percentage is required"),
});