import React from "react";

const FancyButton = () => {
  return (
    <button className="transition ease-out eraser-button-wrapper">
      <div className="transition-all ease-out eraser-button">
        <div className="transition-all ease-out rect-2"></div>
        <div className="transition-all ease-out rect-1 text-center">
          <div className="transition-all ease-out h-full eraser-vector flex justify-center items-center text-center ">
            <svg
              width="48"
              height="42"
              viewBox="0 0 48 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_d_3_71)">
                <path
                  d="M34.4255 33H43.9255V37H30.4255L34.4255 33ZM9.42553 37L5.17553 32.75C4.40887 31.9833 4.0172 31.0333 4.00053 29.9C3.98387 28.7667 4.35887 27.8 5.12553 27L27.1255 4.2C27.8922 3.4 28.8339 3 29.9505 3C31.0672 3 32.0089 3.38333 32.7755 4.15L42.7255 14.1C43.4922 14.8667 43.8755 15.8167 43.8755 16.95C43.8755 18.0833 43.4922 19.0333 42.7255 19.8L25.9255 37H9.42553ZM24.2255 33L39.9255 16.9L30.0255 7L7.92553 29.8L11.1255 33H24.2255Z"
                  fill="white"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_3_71"
                  x="0"
                  y="0"
                  width="47.9255"
                  height="42"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="1" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_3_71"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_3_71"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </button>
  );
};

export default FancyButton;
