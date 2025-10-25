/**
 * 工具模块 - 提供简单的日志功能
 */

module.exports = {
    logger: {
        debug: function(tag, msg, extra) {
            console.log("[DEBUG][" + tag + "] " + msg + (extra ? " " + JSON.stringify(extra) : ""));
        },
        info: function(tag, msg, extra) {
            console.info("[INFO][" + tag + "] " + msg + (extra ? " " + JSON.stringify(extra) : ""));
        },
        warn: function(tag, msg, extra) {
            console.warn("[WARN][" + tag + "] " + msg + (extra ? " " + JSON.stringify(extra) : ""));
        },
        error: function(tag, msg, extra) {
            console.error("[ERROR][" + tag + "] " + msg + (extra ? " " + JSON.stringify(extra) : ""));
        }
    }
};

