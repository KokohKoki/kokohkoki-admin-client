/* eslint-disable react/prop-types */
import classes from "./scss/coupon.module.scss";
import { idrFormatter, usdFormatter } from "../../utils/formatter";
import DeleteCoupon from "./delete-coupon";

export default function CouponItem({ reFetchCoupon, discountCode, discountPercentage, discountMaxPriceIdr, discountMaxPriceUsd, expirationDate }) {
  return (
    <>
      <div className={`${classes.fishes} flex gap-2 items-start`}>
        <div className="text-black font-semibold flex flex-col w-full text-start text-sm">
          <p>
            Coupon Name: <span className="font-normal">{discountCode}</span>
          </p>
          <p>
            Discount Percentage: <span>{discountPercentage}%</span>
          </p>
          <p>
            Max Discount Price IDR: <span className="italic">{idrFormatter(discountMaxPriceIdr)}</span>
          </p>
          <p>
            Max Discount Price USD: <span className="italic">{usdFormatter(discountMaxPriceUsd)}</span>
          </p>
          <p>
            Expired Date: <span>{expirationDate}</span>
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {/* <div>
            <Pen size={20} className="text-rose-500 transition duration-150 hover:text-green-500" />
          </div> */}
          <div>
            <DeleteCoupon couponName={discountCode} onDelete={reFetchCoupon} />
          </div>
        </div>
      </div>
      <div className="w-full h-[2px] bg-gray-500 opacity-50 my-2" />
    </>
  );
}