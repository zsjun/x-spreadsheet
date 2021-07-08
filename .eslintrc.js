/*
 * @Description:
 * @Author: zsj
 * @Date: 2021-07-07 20:18:16
 * @LastEditTime: 2021-07-08 11:53:22
 * @LastEditors: zsj
 * @Usage:
 */
module.exports = {
  extends: "airbnb-base",
  rules: {
    "no-param-reassign": ["error", { props: false }],
    "class-methods-use-this": "off",
    "no-restricted-syntax": ["error", "WithStatement"],
    quotes: 0,
    "no-console": "off",
    implicit-arrow-linebreak: ["error", "beside"]
  },
};
