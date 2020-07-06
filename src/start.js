import { reroute } from "./navigation/reroute.js";
import { formatErrorMessage } from "./applications/app-errors.js";
import { setUrlRerouteOnly } from "./navigation/navigation-events.js";
import { isInBrowser } from "./utils/runtime-environment.js";

let started = false;
/**
 * 主要的启动函数
 * @param {*} opts 
 */
export function start(opts) {
  // 通过一个全局变量存储是否开始
  started = true;
  // 通过参数是否有url路由只读，设置路由只读
  if (opts && opts.urlRerouteOnly) {
    setUrlRerouteOnly(opts.urlRerouteOnly);
  }
  // 判读是否在浏览器中 如果是的话 就检查哪些子应用需要渲染 
  if (isInBrowser) {
    reroute();
  }
}

export function isStarted() {
  return started;
}

if (isInBrowser) {
  setTimeout(() => {
    if (!started) {
      console.warn(
        formatErrorMessage(
          1,
          __DEV__ &&
            `singleSpa.start() has not been called, 5000ms after single-spa was loaded. Before start() is called, apps can be declared and loaded, but not bootstrapped or mounted.`
        )
      );
    }
  }, 5000);
}
