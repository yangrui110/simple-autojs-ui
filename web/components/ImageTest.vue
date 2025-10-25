<template>
    <div>
        <van-cell-group title="截图与权限">
            <van-row type="flex" justify="center">
                <van-button type="primary" @click="testRequestScreenCapture" style="margin: 8px;">请求截图权限</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testCaptureScreen" style="margin: 8px;">截取屏幕</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testCaptureAndSave" style="margin: 8px;">截图并保存</van-button>
            </van-row>
        </van-cell-group>
        
        <van-cell-group title="图片读取与保存">
            <van-row type="flex" justify="center">
                <van-button @click="testReadImage" style="margin: 8px;">读取图片</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testLoadImage" style="margin: 8px;">加载网络图片</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testBase64" style="margin: 8px;">Base64 转换</van-button>
            </van-row>
        </van-cell-group>
        
        <van-cell-group title="图片处理">
            <van-row type="flex" justify="center">
                <van-button @click="testClip" style="margin: 8px;">剪切图片</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testResize" style="margin: 8px;">调整大小</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testScale" style="margin: 8px;">缩放图片</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testRotate" style="margin: 8px;">旋转图片</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testGrayscale" style="margin: 8px;">灰度化</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testThreshold" style="margin: 8px;">二值化</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testBlur" style="margin: 8px;">模糊处理</van-button>
            </van-row>
        </van-cell-group>
        
        <van-cell-group title="找色功能">
            <van-row type="flex" justify="center">
                <van-button @click="testGetPixel" style="margin: 8px;">获取像素颜色</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button type="primary" @click="testFindColor" style="margin: 8px;">找色</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testFindColorEquals" style="margin: 8px;">找完全相等颜色</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testDetectsColor" style="margin: 8px;">检测颜色</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testFindMultiColors" style="margin: 8px;">多点找色</van-button>
            </van-row>
        </van-cell-group>
        
        <van-cell-group title="找图功能">
            <van-row type="flex" justify="center">
                <van-button type="warning" @click="testFindImage" style="margin: 8px;">找图</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testMatchTemplate" style="margin: 8px;">模板匹配</van-button>
            </van-row>
        </van-cell-group>
    </div>
</template>

<script>
export default {
    name: 'ImageTest',
    methods: {
        // ==================== 截图与权限 ====================
        
        // 测试请求截图权限
        async testRequestScreenCapture() {
            try {
                autojs.global.toastLog('正在请求截图权限...');
                const result = await autojs.image.requestScreenCapture();
                if (result) {
                    autojs.global.toastLog('截图权限获取成功');
                } else {
                    autojs.global.toastLog('截图权限获取失败');
                }
            } catch (err) {
                autojs.global.toastLog('请求失败: ' + err);
            }
        },
        
        // 测试截取屏幕
        async testCaptureScreen() {
            try {
                autojs.global.toastLog('正在截取屏幕...');
                const img = await autojs.image.captureScreen();
                if (img) {
                    autojs.global.toastLog('截图成功');
                    // 可以获取截图信息
                    // const width = img.getWidth();
                    // const height = img.getHeight();
                    // autojs.global.toastLog(`截图尺寸: ${width}x${height}`);
                } else {
                    autojs.global.toastLog('截图失败，请先请求截图权限');
                }
            } catch (err) {
                autojs.global.toastLog('截图失败: ' + err);
            }
        },
        
        // 测试截图并保存
        async testCaptureAndSave() {
            try {
                autojs.global.toastLog('正在截图并保存...');
                await autojs.image.captureScreen('/sdcard/screenshot.png');
                autojs.global.toastLog('截图已保存到 /sdcard/screenshot.png');
            } catch (err) {
                autojs.global.toastLog('保存失败: ' + err);
            }
        },
        
        // ==================== 图片读取与保存 ====================
        
        // 测试读取图片
        async testReadImage() {
            try {
                autojs.global.toastLog('尝试读取图片...');
                const img = await autojs.image.read('/sdcard/test.png');
                if (img) {
                    autojs.global.toastLog('图片读取成功');
                } else {
                    autojs.global.toastLog('图片不存在或无法解码');
                }
            } catch (err) {
                autojs.global.toastLog('读取失败: ' + err);
            }
        },
        
        // 测试加载网络图片
        async testLoadImage() {
            try {
                autojs.global.toastLog('尝试加载网络图片...');
                const img = await autojs.image.load('https://example.com/image.png');
                if (img) {
                    autojs.global.toastLog('网络图片加载成功');
                } else {
                    autojs.global.toastLog('网络图片加载失败');
                }
            } catch (err) {
                autojs.global.toastLog('加载失败: ' + err);
            }
        },
        
        // 测试 Base64 转换
        async testBase64() {
            try {
                autojs.global.toastLog('测试 Base64 转换...');
                // 假设已经有一张图片
                const img = await autojs.image.captureScreen();
                if (img) {
                    const base64 = await autojs.image.toBase64(img, 'png', 50);
                    autojs.global.toastLog('Base64 转换成功，长度: ' + base64.length);
                    
                    // 再转回图片
                    const img2 = await autojs.image.fromBase64(base64);
                    if (img2) {
                        autojs.global.toastLog('Base64 解码成功');
                    }
                }
            } catch (err) {
                autojs.global.toastLog('转换失败: ' + err);
            }
        },
        
        // ==================== 图片处理 ====================
        
        // 测试剪切图片
        async testClip() {
            try {
                autojs.global.toastLog('测试剪切图片...');
                const img = await autojs.image.captureScreen();
                if (img) {
                    // 剪切屏幕中心 400x400 区域
                    const width = await autojs.global.WIDTH;
                    const height = await autojs.global.HEIGHT;
                    const x = (width - 400) / 2;
                    const y = (height - 400) / 2;
                    
                    const clipped = await autojs.image.clip(img, x, y, 400, 400);
                    await autojs.image.save(clipped, '/sdcard/clipped.png');
                    autojs.global.toastLog('图片剪切成功，已保存');
                }
            } catch (err) {
                autojs.global.toastLog('剪切失败: ' + err);
            }
        },
        
        // 测试调整大小
        async testResize() {
            try {
                autojs.global.toastLog('测试调整大小...');
                const img = await autojs.image.captureScreen();
                if (img) {
                    const resized = await autojs.image.resize(img, [500, 500]);
                    await autojs.image.save(resized, '/sdcard/resized.png');
                    autojs.global.toastLog('图片已调整为 500x500 并保存');
                }
            } catch (err) {
                autojs.global.toastLog('调整失败: ' + err);
            }
        },
        
        // 测试缩放图片
        async testScale() {
            try {
                autojs.global.toastLog('测试缩放图片...');
                const img = await autojs.image.captureScreen();
                if (img) {
                    const scaled = await autojs.image.scale(img, 0.5, 0.5);
                    await autojs.image.save(scaled, '/sdcard/scaled.png');
                    autojs.global.toastLog('图片已缩放为原来的 50% 并保存');
                }
            } catch (err) {
                autojs.global.toastLog('缩放失败: ' + err);
            }
        },
        
        // 测试旋转图片
        async testRotate() {
            try {
                autojs.global.toastLog('测试旋转图片...');
                const img = await autojs.image.captureScreen();
                if (img) {
                    const rotated = await autojs.image.rotate(img, 90);
                    await autojs.image.save(rotated, '/sdcard/rotated.png');
                    autojs.global.toastLog('图片已旋转 90 度并保存');
                }
            } catch (err) {
                autojs.global.toastLog('旋转失败: ' + err);
            }
        },
        
        // 测试灰度化
        async testGrayscale() {
            try {
                autojs.global.toastLog('测试灰度化...');
                const img = await autojs.image.captureScreen();
                if (img) {
                    const gray = await autojs.image.grayscale(img);
                    await autojs.image.save(gray, '/sdcard/gray.png');
                    autojs.global.toastLog('图片已灰度化并保存');
                }
            } catch (err) {
                autojs.global.toastLog('灰度化失败: ' + err);
            }
        },
        
        // 测试二值化
        async testThreshold() {
            try {
                autojs.global.toastLog('测试二值化...');
                const img = await autojs.image.captureScreen();
                if (img) {
                    // 先灰度化
                    const gray = await autojs.image.grayscale(img);
                    // 再二值化
                    const binary = await autojs.image.threshold(gray, 100, 255, 'BINARY');
                    await autojs.image.save(binary, '/sdcard/binary.png');
                    autojs.global.toastLog('图片已二值化并保存');
                }
            } catch (err) {
                autojs.global.toastLog('二值化失败: ' + err);
            }
        },
        
        // 测试模糊处理
        async testBlur() {
            try {
                autojs.global.toastLog('测试模糊处理...');
                const img = await autojs.image.captureScreen();
                if (img) {
                    const blurred = await autojs.image.blur(img, [10, 10]);
                    await autojs.image.save(blurred, '/sdcard/blurred.png');
                    autojs.global.toastLog('图片已模糊处理并保存');
                }
            } catch (err) {
                autojs.global.toastLog('模糊处理失败: ' + err);
            }
        },
        
        // ==================== 找色功能 ====================
        
        // 测试获取像素颜色
        async testGetPixel() {
            try {
                autojs.global.toastLog('获取屏幕中心像素颜色...');
                const img = await autojs.image.captureScreen();
                if (img) {
                    const width = await autojs.global.WIDTH;
                    const height = await autojs.global.HEIGHT;
                    const x = Math.floor(width / 2);
                    const y = Math.floor(height / 2);
                    
                    const color = await autojs.image.pixel(img, x, y);
                    const colorStr = '#' + ('00000000' + color.toString(16)).slice(-8);
                    autojs.global.toastLog(`位置 (${x}, ${y}) 的颜色: ${colorStr}`);
                }
            } catch (err) {
                autojs.global.toastLog('获取失败: ' + err);
            }
        },
        
        // 测试找色
        async testFindColor() {
            try {
                autojs.global.toastLog('尝试在屏幕上找红色...');
                const img = await autojs.image.captureScreen();
                if (img) {
                    const point = await autojs.image.findColor(img, '#ff0000', {
                        threshold: 16
                    });
                    if (point) {
                        autojs.global.toastLog(`找到红色，位置: (${point.x}, ${point.y})`);
                    } else {
                        autojs.global.toastLog('未找到红色');
                    }
                }
            } catch (err) {
                autojs.global.toastLog('找色失败: ' + err);
            }
        },
        
        // 测试找完全相等的颜色
        async testFindColorEquals() {
            try {
                autojs.global.toastLog('尝试找完全相等的颜色...');
                const img = await autojs.image.captureScreen();
                if (img) {
                    const point = await autojs.image.findColorEquals(img, '#ffffff');
                    if (point) {
                        autojs.global.toastLog(`找到白色，位置: (${point.x}, ${point.y})`);
                    } else {
                        autojs.global.toastLog('未找到白色');
                    }
                }
            } catch (err) {
                autojs.global.toastLog('找色失败: ' + err);
            }
        },
        
        // 测试检测颜色
        async testDetectsColor() {
            try {
                autojs.global.toastLog('检测屏幕中心是否为白色...');
                const img = await autojs.image.captureScreen();
                if (img) {
                    const width = await autojs.global.WIDTH;
                    const height = await autojs.global.HEIGHT;
                    const x = Math.floor(width / 2);
                    const y = Math.floor(height / 2);
                    
                    const result = await autojs.image.detectsColor(img, '#ffffff', x, y, 16);
                    autojs.global.toastLog(result ? '是白色' : '不是白色');
                }
            } catch (err) {
                autojs.global.toastLog('检测失败: ' + err);
            }
        },
        
        // 测试多点找色
        async testFindMultiColors() {
            try {
                autojs.global.toastLog('尝试多点找色...');
                const img = await autojs.image.captureScreen();
                if (img) {
                    // 示例：找第一个点为红色，相对位置(10, 10)为白色的位置
                    const point = await autojs.image.findMultiColors(
                        img,
                        '#ff0000',
                        [[10, 10, '#ffffff']],
                        { threshold: 16 }
                    );
                    if (point) {
                        autojs.global.toastLog(`找到匹配位置: (${point.x}, ${point.y})`);
                    } else {
                        autojs.global.toastLog('未找到匹配位置');
                    }
                }
            } catch (err) {
                autojs.global.toastLog('多点找色失败: ' + err);
            }
        },
        
        // ==================== 找图功能 ====================
        
        // 测试找图
        async testFindImage() {
            try {
                autojs.global.toastLog('测试找图功能...');
                autojs.global.toastLog('请先准备模板图片: /sdcard/template.png');
                
                const img = await autojs.image.captureScreen();
                const template = await autojs.image.read('/sdcard/template.png');
                
                if (img && template) {
                    const point = await autojs.image.findImage(img, template, {
                        threshold: 0.8
                    });
                    if (point) {
                        autojs.global.toastLog(`找到图片，位置: (${point.x}, ${point.y})`);
                    } else {
                        autojs.global.toastLog('未找到图片');
                    }
                } else {
                    autojs.global.toastLog('图片加载失败');
                }
            } catch (err) {
                autojs.global.toastLog('找图失败: ' + err);
            }
        },
        
        // 测试模板匹配
        async testMatchTemplate() {
            try {
                autojs.global.toastLog('测试模板匹配（多结果）...');
                autojs.global.toastLog('请先准备模板图片: /sdcard/template.png');
                
                const img = await autojs.image.captureScreen();
                const template = await autojs.image.read('/sdcard/template.png');
                
                if (img && template) {
                    const result = await autojs.image.matchTemplate(img, template, {
                        threshold: 0.8,
                        max: 5
                    });
                    if (result && result.matches && result.matches.length > 0) {
                        autojs.global.toastLog(`找到 ${result.matches.length} 个匹配`);
                        result.matches.forEach((match, index) => {
                            autojs.global.toastLog(
                                `匹配 ${index + 1}: (${match.point.x}, ${match.point.y}), 相似度: ${match.similarity}`
                            );
                        });
                    } else {
                        autojs.global.toastLog('未找到匹配');
                    }
                } else {
                    autojs.global.toastLog('图片加载失败');
                }
            } catch (err) {
                autojs.global.toastLog('模板匹配失败: ' + err);
            }
        }
    }
};
</script>

