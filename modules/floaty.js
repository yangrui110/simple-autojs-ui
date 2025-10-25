/**
 * Floaty 模块 - 悬浮窗管理
 */

var logger = require('./utils.js').logger;

// 悬浮窗管理器
var floatyManager = {
    // 悬浮窗相关状态
    floatyWindow: null,
    isFloatyEnabled: false,
    isFloatyExpanded: false,
    floatyButtons: [],
    
    // 回调函数
    getScriptStatusCallback: null,
    onActionCallback: null,

    // 创建浮动窗口
    createFloatyWindow: function() {
        try {
            if (this.floatyWindow) {
                this.removeFloatyWindow();
            }

            // 创建主悬浮按钮
            this.floatyWindow = floaty.window(
                <button text="⚡" textSize="18sp" textColor="#ffffff"
                        bg="#4CAF50" w="48dp" h="48dp"
                        id="mainButton"/>
            );

            // 延迟设置位置和事件
            var self = this;
            setTimeout(function() {
                try {
                    if (self.floatyWindow) {
                        self.floatyWindow.setPosition(50, 200);

                        // 设置圆形背景
                        try {
                            var button = self.floatyWindow.mainButton;
                            var drawable = new android.graphics.drawable.GradientDrawable();
                            drawable.setShape(android.graphics.drawable.GradientDrawable.OVAL);
                            drawable.setColor(android.graphics.Color.parseColor("#4CAF50"));
                            button.setBackground(drawable);
                            logger.debug("Floaty", "成功设置圆形背景");
                        } catch (e) {
                            logger.debug("Floaty", "设置圆形背景失败", { error: e.message });
                        }

                        // 添加拖动功能
                        self.addDragFunctionality(self.floatyWindow);
                    }
                } catch (e) {
                    logger.debug("Floaty", "设置悬浮窗属性失败", { error: e.message });
                }
            }, 200);

            this.isFloatyEnabled = true;
            this.isFloatyExpanded = false;
            toast("悬浮图标已显示");

        } catch (e) {
            logger.error("Floaty", "创建悬浮窗失败", { error: e.message, stack: e.stack });
            toast("创建悬浮图标失败，可能需要悬浮窗权限");
            this.isFloatyEnabled = false;
            throw e;
        }
    },

    // 移除浮动窗口
    removeFloatyWindow: function() {
        try {
            // 先收起所有扩展按钮
            this.collapseFloatyMenu();

            // 关闭主悬浮窗
            if (this.floatyWindow) {
                this.floatyWindow.close();
                this.floatyWindow = null;
            }

            this.isFloatyEnabled = false;
            this.isFloatyExpanded = false;
            toast("悬浮图标已关闭");
        } catch (e) {
            logger.error("Floaty", "关闭悬浮窗失败", { error: e.message, stack: e.stack });
        }
    },

    // 添加拖动功能
    addDragFunctionality: function(window) {
        try {
            var button = window.mainButton;
            var startX = 0, startY = 0;
            var windowX = 0, windowY = 0;
            var isDragging = false;
            var startTime = 0;
            var self = this;

            button.setOnTouchListener(function(view, event) {
                try {
                    switch(event.getAction()) {
                        case android.view.MotionEvent.ACTION_DOWN:
                            startX = event.getRawX();
                            startY = event.getRawY();
                            windowX = window.getX();
                            windowY = window.getY();
                            isDragging = false;
                            startTime = Date.now();
                            return true;

                        case android.view.MotionEvent.ACTION_MOVE:
                            var deltaX = event.getRawX() - startX;
                            var deltaY = event.getRawY() - startY;
                            var distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

                            if (distance > 10 && !isDragging) {
                                isDragging = true;
                                if (self.isFloatyExpanded) {
                                    self.collapseFloatyMenu();
                                }
                            }

                            if (isDragging) {
                                var newX = windowX + deltaX;
                                var newY = windowY + deltaY;

                                var screenWidth = context.getResources().getDisplayMetrics().widthPixels;
                                var screenHeight = context.getResources().getDisplayMetrics().heightPixels;
                                var buttonWidth = button.getWidth();
                                var buttonHeight = button.getHeight();

                                var clampedX = Math.max(0, Math.min(newX, screenWidth - buttonWidth));
                                var clampedY = Math.max(0, Math.min(newY, screenHeight - buttonHeight));

                                window.setPosition(clampedX, clampedY);
                            }
                            return true;

                        case android.view.MotionEvent.ACTION_UP:
                            var endTime = Date.now();
                            var touchDuration = endTime - startTime;

                            if (!isDragging && touchDuration < 300) {
                                setTimeout(function() {
                                    self.toggleFloatyMenu();
                                }, 50);
                            } else if (isDragging) {
                                self.snapToEdge(window);
                            }

                            isDragging = false;
                            return true;
                    }
                } catch (e) {
                    logger.error("Floaty", "拖动事件处理失败", { error: e.message });
                }
                return false;
            });

            logger.debug("Floaty", "拖动功能添加成功");
        } catch (e) {
            logger.error("Floaty", "添加拖动功能失败", { error: e.message, stack: e.stack });
        }
    },

    // 悬浮窗吸边效果
    snapToEdge: function(window) {
        try {
            var screenWidth = context.getResources().getDisplayMetrics().widthPixels;
            var currentX = window.getX();
            var currentY = window.getY();
            var buttonWidth = 48 * context.getResources().getDisplayMetrics().density;

            var centerX = currentX + buttonWidth / 2;
            var targetX;

            if (centerX < screenWidth / 2) {
                targetX = 0;
            } else {
                targetX = screenWidth - buttonWidth;
            }

            var animator = android.animation.ValueAnimator.ofFloat(currentX, targetX);
            animator.setDuration(200);
            animator.addUpdateListener(new android.animation.ValueAnimator.AnimatorUpdateListener({
                onAnimationUpdate: function(animation) {
                    try {
                        var animatedValue = animation.getAnimatedValue();
                        window.setPosition(animatedValue, currentY);
                    } catch (e) {
                        logger.error("Floaty", "动画更新失败", { error: e.message });
                    }
                }
            }));
            animator.start();

            logger.debug("Floaty", "悬浮窗吸边完成");
        } catch (e) {
            logger.error("Floaty", "悬浮窗吸边失败", { error: e.message, stack: e.stack });
        }
    },

    // 切换悬浮菜单
    toggleFloatyMenu: function() {
        if (this.isFloatyExpanded) {
            this.collapseFloatyMenu();
        } else {
            this.expandFloatyMenu();
        }
    },

    // 展开悬浮菜单
    expandFloatyMenu: function() {
        try {
            this.collapseFloatyMenu();

            var mainX = this.floatyWindow.getX();
            var mainY = this.floatyWindow.getY();

            // 获取脚本运行状态
            var isScriptRunning = this.getScriptStatusCallback ? this.getScriptStatusCallback() : false;

            var buttons = [
                {
                    text: isScriptRunning ? "⏹️" : "▶️",
                    color: isScriptRunning ? "#f44336" : "#FF9800",
                    action: "toggle"
                },
                { text: "📋", color: "#2196F3", action: "log" },
                { text: "⚙️", color: "#4CAF50", action: "config" },
                { text: "❌", color: "#666666", action: "close" }
            ];

            var radius = 120;
            var startAngle = -90;
            var totalAngle = 180;
            var angleStep = totalAngle / (buttons.length - 1);

            var self = this;

            buttons.forEach(function(btn, index) {
                setTimeout(function() {
                    try {
                        var angle = startAngle + index * angleStep;
                        var angleRad = angle * Math.PI / 180;
                        var targetOffsetX = Math.cos(angleRad) * radius;
                        var targetOffsetY = Math.sin(angleRad) * radius;
                        var targetX = mainX + targetOffsetX;
                        var targetY = mainY + targetOffsetY;

                        var button = floaty.window(
                            <button text={btn.text} textSize="14sp" textColor="#ffffff"
                                    bg={btn.color} w="36dp" h="36dp"
                                    id="actionBtn" alpha="0"/>
                        );

                        button.setPosition(mainX, mainY);

                        setTimeout(function() {
                            try {
                                var actionButton = button.actionBtn;
                                
                                var drawable = new android.graphics.drawable.GradientDrawable();
                                drawable.setShape(android.graphics.drawable.GradientDrawable.OVAL);
                                drawable.setColor(android.graphics.Color.parseColor(btn.color));
                                actionButton.setBackground(drawable);

                                var animator = android.animation.ValueAnimator.ofFloat(0, 1);
                                animator.setDuration(300);
                                animator.setInterpolator(new android.view.animation.DecelerateInterpolator());
                                
                                animator.addUpdateListener(new android.animation.ValueAnimator.AnimatorUpdateListener({
                                    onAnimationUpdate: function(animation) {
                                        try {
                                            var progress = animation.getAnimatedValue();
                                            var currentX = mainX + targetOffsetX * progress;
                                            var currentY = mainY + targetOffsetY * progress;
                                            button.setPosition(currentX, currentY);
                                            actionButton.setAlpha(progress);
                                        } catch (e) {
                                            logger.debug("Floaty", "动画更新失败", { error: e.message });
                                        }
                                    }
                                }));
                                
                                animator.start();
                                
                            } catch (e) {
                                logger.debug("Floaty", "设置功能按钮失败", { error: e.message });
                                button.setPosition(targetX, targetY);
                                button.actionBtn.setAlpha(1);
                            }
                        }, 50);

                        button.actionBtn.click(function() {
                            if (self.onActionCallback) {
                                self.onActionCallback(btn.action);
                            }
                        });

                        self.floatyButtons.push(button);
                    } catch (e) {
                        logger.warn("Floaty", "创建悬浮按钮失败", { error: e.message });
                    }
                }, 0);
            });

            this.isFloatyExpanded = true;

        } catch (e) {
            logger.error("Floaty", "展开悬浮菜单失败", { error: e.message, stack: e.stack });
        }
    },

    // 收起悬浮菜单
    collapseFloatyMenu: function() {
        try {
            this.floatyButtons.forEach(button => {
                if (button) {
                    button.close();
                }
            });
            this.floatyButtons = [];
            this.isFloatyExpanded = false;
        } catch (e) {
            logger.warn("Floaty", "收起悬浮菜单失败", { error: e.message });
        }
    },

    // 设置回调函数
    setGetScriptStatusCallback: function(callback) {
        this.getScriptStatusCallback = callback;
    },

    setOnActionCallback: function(callback) {
        this.onActionCallback = callback;
    }
};

module.exports = {
    floatyManager: floatyManager,

    /**
     * 注册 floaty 模块的所有 handlers
     * @param {Object} jsBridge - WebView 的 jsBridge 对象
     */
    register: function(jsBridge) {
        // 创建悬浮窗
        jsBridge.handle('floaty.create', function(event) {
            floatyManager.createFloatyWindow();
            return { success: true };
        });

        // 移除悬浮窗
        jsBridge.handle('floaty.remove', function(event) {
            floatyManager.removeFloatyWindow();
            return { success: true };
        });

        // 展开菜单
        jsBridge.handle('floaty.expand', function(event) {
            floatyManager.expandFloatyMenu();
            return { success: true };
        });

        // 收起菜单
        jsBridge.handle('floaty.collapse', function(event) {
            floatyManager.collapseFloatyMenu();
            return { success: true };
        });

        // 获取悬浮窗状态
        jsBridge.handle('floaty.getStatus', function(event) {
            return {
                isEnabled: floatyManager.isFloatyEnabled,
                isExpanded: floatyManager.isFloatyExpanded
            };
        });
    }
};

