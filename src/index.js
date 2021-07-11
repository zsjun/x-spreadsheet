/* global window, document */
import { h } from "./component/element";
import DataProxy from "./core/data_proxy";
import Sheet from "./component/sheet";
import Bottombar from "./component/bottombar";
import { cssPrefix } from "./config";
import { locale } from "./locale/locale";
import "./index.less";

class Spreadsheet {
  constructor(selectors, options = {}) {
    let targetEl = selectors;

    // 默认显示bottombar
    this.options = { showBottomBar: true, ...options };
    // sheetIndex 类似excel下面的几个表格的索引
    this.sheetIndex = 1;
    // 所有的数据，也就是每个sheet在数组中一个索引
    this.datas = [];
    if (typeof selectors === "string") {
      // 获取容器
      targetEl = document.querySelector(selectors);
    }
    this.bottombar = this.options.showBottomBar
      ? new Bottombar(
          () => {
            const d = this.addSheet();
            this.sheet.resetData(d);
          },
          (index) => {
            const d = this.datas[index];
            this.sheet.resetData(d);
          },
          () => {
            this.deleteSheet();
          },
          (index, value) => {
            this.datas[index].name = value;
          }
        )
      : null;

    // #
    // addSheet(name, active)
    // 功能 添加多表
    // @param name string 名称
    // @param active boolean 默认为 true
    // this.data 表示一张表的所有数据代理
    this.data = this.addSheet();
    // h就是创建一个对象，该对象的属性el表示创建的dom元素
    const rootEl = h("div", `${cssPrefix}`).on("contextmenu", (evt) =>
      evt.preventDefault()
    );
    // 把我们创建的元素插入到浏览器的dom元素上
    targetEl.appendChild(rootEl.el);
    // 创建表，this.data表示 DataProxy 代理类
    this.sheet = new Sheet(rootEl, this.data);
    if (this.bottombar !== null) {
      rootEl.child(this.bottombar.el);
    }
  }

  addSheet(name, active = true) {
    const sheetName = name || `sheet${this.sheetIndex}`;
    // 创建了整个数据的代理类，类似于监听整个数据
    const sheetDataProxy = new DataProxy(sheetName, this.options);
    sheetDataProxy.change = (...args) => {
      this.sheet.trigger("change", ...args);
    };
    this.datas.push(sheetDataProxy);
    // console.log('d:', n, d, this.datas);
    if (this.bottombar !== null) {
      this.bottombar.addItem(sheetName, active);
    }
    this.sheetIndex += 1;
    return sheetDataProxy;
  }

  deleteSheet() {
    if (this.bottombar === null) return;

    const [oldIndex, nindex] = this.bottombar.deleteItem();
    if (oldIndex >= 0) {
      this.datas.splice(oldIndex, 1);
      if (nindex >= 0) this.sheet.resetData(this.datas[nindex]);
    }
  }

  loadData(data) {
    const dataSheets = Array.isArray(data) ? data : [data];
    if (this.bottombar !== null) {
      this.bottombar.clear();
    }
    this.datas = [];
    if (dataSheets.length > 0) {
      for (let i = 0; i < dataSheets.length; i++) {
        const dataSheet = dataSheets[i];
        // 返回一个dataSheetProxy
        const nd = this.addSheet(dataSheet.name, i === 0);
        nd.setData(dataSheet);
        if (i === 0) {
          this.sheet.resetData(nd);
        }
      }
    }
    return this;
  }

  getData() {
    return this.datas.map((it) => it.getData());
  }

  cellText(ri, ci, text, sheetIndex = 0) {
    this.datas[sheetIndex].setCellText(ri, ci, text, "finished");
    return this;
  }

  cell(ri, ci, sheetIndex = 0) {
    return this.datas[sheetIndex].getCell(ri, ci);
  }

  cellStyle(ri, ci, sheetIndex = 0) {
    return this.datas[sheetIndex].getCellStyle(ri, ci);
  }

  reRender() {
    this.sheet.table.render();
    return this;
  }

  on(eventName, func) {
    this.sheet.on(eventName, func);
    return this;
  }

  validate() {
    const { validations } = this.data;
    return validations.errors.size <= 0;
  }

  change(cb) {
    this.sheet.on("change", cb);
    return this;
  }

  static locale(lang, message) {
    locale(lang, message);
  }
}

const spreadsheet = (el, options = {}) => new Spreadsheet(el, options);

if (window) {
  window.x_spreadsheet = spreadsheet;
  window.x_spreadsheet.locale = (lang, message) => locale(lang, message);
}

export default Spreadsheet;
export { spreadsheet };
