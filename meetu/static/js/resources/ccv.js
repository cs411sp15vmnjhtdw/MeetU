/**
 * Liu Liu's opencv javascript 
 */
var parallable = function(file, funct) {
    "use strict";
    return parallable.core[funct.toString()] = funct().core,
        function() {
            var i, async, worker_num, params;
            if (arguments.length > 1)
                for (async = arguments[arguments.length - 2], worker_num = arguments[arguments.length - 1],
                    params = new Array(arguments.length - 2), i = 0; i < arguments.length - 2; i++) params[i] = arguments[i];
            else async = arguments[0].async,
                worker_num = arguments[0].worker, params = arguments[0], delete params.async, delete params.worker,
                params = [params];
            var scope = {
                    shared: {}
                },
                ctrl = funct.apply(scope, params);
            return async ? function(complete) {
                var executed = 0,
                    outputs = new Array(worker_num),
                    inputs = ctrl.pre.apply(scope, [worker_num]);
                for (i in scope.shared) "function" == typeof scope.shared[i] ? delete scope.shared[i] : void 0 !== scope.shared[i].tagName && delete scope.shared[i];
                for (i = 0; worker_num > i; i++) {
                    var worker = new Worker(file);
                    worker.onmessage = function(i) {
                        return function(event) {
                            outputs[i] = "string" == typeof event.data ? JSON.parse(event.data) : event.data,
                                executed++, executed == worker_num && complete(ctrl.post.apply(scope, [outputs]));
                        };
                    }(i);
                    var msg = {
                        input: inputs[i],
                        name: funct.toString(),
                        shared: scope.shared,
                        id: i,
                        worker: params.worker_num
                    };
                    try {
                        worker.postMessage(msg);
                    } catch (e) {
                        worker.postMessage(JSON.stringify(msg));
                    }
                }
            } : ctrl.post.apply(scope, [
                [ctrl.core.apply(scope, [ctrl.pre.apply(scope, [1])[0], 0, 1])]
            ]);
        };
};
parallable.core = {};
var ccv = {
    pre: function(image) {
        if ("img" == image.tagName.toLowerCase()) {
            var canvas = document.createElement("canvas");
            document.body.appendChild(image), canvas.width = image.offsetWidth, canvas.style.width = image.offsetWidth.toString() + "px",
                canvas.height = image.offsetHeight, canvas.style.height = image.offsetHeight.toString() + "px",
                document.body.removeChild(image);
            var ctx = canvas.getContext("2d");
            return ctx.drawImage(image, 0, 0), canvas;
        }
        return image;
    },
    grayscale: function(canvas) {
        for (var pix1, pix2, ctx = canvas.getContext("2d"), imageData = ctx.getImageData(0, 0, canvas.width, canvas.height), data = imageData.data, pix = canvas.width * canvas.height * 4; pix > 0;) data[pix -= 4] = data[pix1 = pix + 1] = data[pix2 = pix + 2] = .3 * data[pix] + .59 * data[pix1] + .11 * data[pix2];
        return ctx.putImageData(imageData, 0, 0), canvas;
    },
    array_group: function(seq, gfunc) {
        var i, j, node = new Array(seq.length);
        for (i = 0; i < seq.length; i++) node[i] = {
            parent: -1,
            element: seq[i],
            rank: 0
        };
        for (i = 0; i < seq.length; i++)
            if (node[i].element) {
                for (var root = i; - 1 != node[root].parent;) root = node[root].parent;
                for (j = 0; j < seq.length; j++)
                    if (i != j && node[j].element && gfunc(node[i].element, node[j].element)) {
                        for (var root2 = j; - 1 != node[root2].parent;) root2 = node[root2].parent;
                        if (root2 != root) {
                            node[root].rank > node[root2].rank ? node[root2].parent = root : (node[root].parent = root2,
                                node[root].rank == node[root2].rank && node[root2].rank++, root = root2);
                            for (var temp, node2 = j; - 1 != node[node2].parent;) temp = node2, node2 = node[node2].parent,
                                node[temp].parent = root;
                            for (node2 = i; - 1 != node[node2].parent;) temp = node2, node2 = node[node2].parent,
                                node[temp].parent = root;
                        }
                    }
            }
        var idx = new Array(seq.length),
            class_idx = 0;
        for (i = 0; i < seq.length; i++) {
            j = -1;
            var node1 = i;
            if (node[node1].element) {
                for (; - 1 != node[node1].parent;) node1 = node[node1].parent;
                node[node1].rank >= 0 && (node[node1].rank = ~class_idx++), j = ~node[node1].rank;
            }
            idx[i] = j;
        }
        return {
            index: idx,
            cat: class_idx
        };
    },
    detect_objects: parallable("", function() {
        function pre() {
            var canvas = this.shared.canvas,
                interval = this.shared.interval,
                scale = this.shared.scale,
                next = this.shared.next,
                scale_upto = this.shared.scale_upto,
                pyr = new Array(4 * (scale_upto + 2 * next)),
                ret = new Array(4 * (scale_upto + 2 * next));
            pyr[0] = canvas, ret[0] = {
                width: pyr[0].width,
                height: pyr[0].height,
                data: pyr[0].getContext("2d").getImageData(0, 0, pyr[0].width, pyr[0].height).data
            };
            var i;
            for (i = 1; interval >= i; i++) pyr[4 * i] = document.createElement("canvas"), pyr[4 * i].width = Math.floor(pyr[0].width / Math.pow(scale, i)),
                pyr[4 * i].height = Math.floor(pyr[0].height / Math.pow(scale, i)), pyr[4 * i].getContext("2d").drawImage(pyr[0], 0, 0, pyr[0].width, pyr[0].height, 0, 0, pyr[4 * i].width, pyr[4 * i].height),
                ret[4 * i] = {
                    width: pyr[4 * i].width,
                    height: pyr[4 * i].height,
                    data: pyr[4 * i].getContext("2d").getImageData(0, 0, pyr[4 * i].width, pyr[4 * i].height).data
                };
            for (i = next; scale_upto + 2 * next > i; i++) pyr[4 * i] = document.createElement("canvas"),
                pyr[4 * i].width = Math.floor(pyr[4 * i - 4 * next].width / 2), pyr[4 * i].height = Math.floor(pyr[4 * i - 4 * next].height / 2),
                pyr[4 * i].getContext("2d").drawImage(pyr[4 * i - 4 * next], 0, 0, pyr[4 * i - 4 * next].width, pyr[4 * i - 4 * next].height, 0, 0, pyr[4 * i].width, pyr[4 * i].height),
                ret[4 * i] = {
                    width: pyr[4 * i].width,
                    height: pyr[4 * i].height,
                    data: pyr[4 * i].getContext("2d").getImageData(0, 0, pyr[4 * i].width, pyr[4 * i].height).data
                };
            for (i = 2 * next; scale_upto + 2 * next > i; i++) pyr[4 * i + 1] = document.createElement("canvas"),
                pyr[4 * i + 1].width = Math.floor(pyr[4 * i - 4 * next].width / 2), pyr[4 * i + 1].height = Math.floor(pyr[4 * i - 4 * next].height / 2),
                pyr[4 * i + 1].getContext("2d").drawImage(pyr[4 * i - 4 * next], 1, 0, pyr[4 * i - 4 * next].width - 1, pyr[4 * i - 4 * next].height, 0, 0, pyr[4 * i + 1].width - 2, pyr[4 * i + 1].height),
                ret[4 * i + 1] = {
                    width: pyr[4 * i + 1].width,
                    height: pyr[4 * i + 1].height,
                    data: pyr[4 * i + 1].getContext("2d").getImageData(0, 0, pyr[4 * i + 1].width, pyr[4 * i + 1].height).data
                }, pyr[4 * i + 2] = document.createElement("canvas"), pyr[4 * i + 2].width = Math.floor(pyr[4 * i - 4 * next].width / 2),
                pyr[4 * i + 2].height = Math.floor(pyr[4 * i - 4 * next].height / 2), pyr[4 * i + 2].getContext("2d").drawImage(pyr[4 * i - 4 * next], 0, 1, pyr[4 * i - 4 * next].width, pyr[4 * i - 4 * next].height - 1, 0, 0, pyr[4 * i + 2].width, pyr[4 * i + 2].height - 2),
                ret[4 * i + 2] = {
                    width: pyr[4 * i + 2].width,
                    height: pyr[4 * i + 2].height,
                    data: pyr[4 * i + 2].getContext("2d").getImageData(0, 0, pyr[4 * i + 2].width, pyr[4 * i + 2].height).data
                }, pyr[4 * i + 3] = document.createElement("canvas"), pyr[4 * i + 3].width = Math.floor(pyr[4 * i - 4 * next].width / 2),
                pyr[4 * i + 3].height = Math.floor(pyr[4 * i - 4 * next].height / 2), pyr[4 * i + 3].getContext("2d").drawImage(pyr[4 * i - 4 * next], 1, 1, pyr[4 * i - 4 * next].width - 1, pyr[4 * i - 4 * next].height - 1, 0, 0, pyr[4 * i + 3].width - 2, pyr[4 * i + 3].height - 2),
                ret[4 * i + 3] = {
                    width: pyr[4 * i + 3].width,
                    height: pyr[4 * i + 3].height,
                    data: pyr[4 * i + 3].getContext("2d").getImageData(0, 0, pyr[4 * i + 3].width, pyr[4 * i + 3].height).data
                };
            return [ret];
        }

        function core(pyr) {
            var i, j, k, x, y, q, cascade = this.shared.cascade,
                scale = (this.shared.interval,
                    this.shared.scale),
                next = this.shared.next,
                scale_upto = this.shared.scale_upto,
                scale_x = 1,
                scale_y = 1,
                dx = [0, 1, 0, 1],
                dy = [0, 0, 1, 1],
                seq = [];
            for (i = 0; scale_upto > i; i++) {
                var qw = pyr[4 * i + 8 * next].width - Math.floor(cascade.width / 4),
                    qh = pyr[4 * i + 8 * next].height - Math.floor(cascade.height / 4),
                    step = [4 * pyr[4 * i].width, 4 * pyr[4 * i + 4 * next].width, 4 * pyr[4 * i + 8 * next].width],
                    paddings = [16 * pyr[4 * i].width - 16 * qw, 8 * pyr[4 * i + 4 * next].width - 8 * qw, 4 * pyr[4 * i + 8 * next].width - 4 * qw];
                for (j = 0; j < cascade.stage_classifier.length; j++) {
                    var orig_feature = cascade.stage_classifier[j].orig_feature,
                        feature = cascade.stage_classifier[j].feature = new Array(cascade.stage_classifier[j].count);
                    for (k = 0; k < cascade.stage_classifier[j].count; k++)
                        for (feature[k] = {
                                size: orig_feature[k].size,
                                px: new Array(orig_feature[k].size),
                                pz: new Array(orig_feature[k].size),
                                nx: new Array(orig_feature[k].size),
                                nz: new Array(orig_feature[k].size)
                            }, q = 0; q < orig_feature[k].size; q++) feature[k].px[q] = 4 * orig_feature[k].px[q] + orig_feature[k].py[q] * step[orig_feature[k].pz[q]],
                            feature[k].pz[q] = orig_feature[k].pz[q], feature[k].nx[q] = 4 * orig_feature[k].nx[q] + orig_feature[k].ny[q] * step[orig_feature[k].nz[q]],
                            feature[k].nz[q] = orig_feature[k].nz[q];
                }
                for (q = 0; 4 > q; q++) {
                    var u8 = [pyr[4 * i].data, pyr[4 * i + 4 * next].data, pyr[4 * i + 8 * next + q].data],
                        u8o = [8 * dx[q] + dy[q] * pyr[4 * i].width * 8, 4 * dx[q] + dy[q] * pyr[4 * i + 4 * next].width * 4, 0];
                    for (y = 0; qh > y; y++) {
                        for (x = 0; qw > x; x++) {
                            var sum = 0,
                                flag = !0;
                            for (j = 0; j < cascade.stage_classifier.length; j++) {
                                sum = 0;
                                var alpha = cascade.stage_classifier[j].alpha,
                                    feature = cascade.stage_classifier[j].feature;
                                for (k = 0; k < cascade.stage_classifier[j].count; k++) {
                                    var p, n, feature_k = feature[k],
                                        pmin = u8[feature_k.pz[0]][u8o[feature_k.pz[0]] + feature_k.px[0]],
                                        nmax = u8[feature_k.nz[0]][u8o[feature_k.nz[0]] + feature_k.nx[0]];
                                    if (nmax >= pmin) sum += alpha[2 * k];
                                    else {
                                        var f, shortcut = !0;
                                        for (f = 0; f < feature_k.size; f++) {
                                            if (feature_k.pz[f] >= 0 && (p = u8[feature_k.pz[f]][u8o[feature_k.pz[f]] + feature_k.px[f]],
                                                    pmin > p)) {
                                                if (nmax >= p) {
                                                    shortcut = !1;
                                                    break;
                                                }
                                                pmin = p;
                                            }
                                            if (feature_k.nz[f] >= 0 && (n = u8[feature_k.nz[f]][u8o[feature_k.nz[f]] + feature_k.nx[f]],
                                                    n > nmax)) {
                                                if (n >= pmin) {
                                                    shortcut = !1;
                                                    break;
                                                }
                                                nmax = n;
                                            }
                                        }
                                        sum += shortcut ? alpha[2 * k + 1] : alpha[2 * k];
                                    }
                                }
                                if (sum < cascade.stage_classifier[j].threshold) {
                                    flag = !1;
                                    break;
                                }
                            }
                            flag && seq.push({
                                x: (4 * x + 2 * dx[q]) * scale_x,
                                y: (4 * y + 2 * dy[q]) * scale_y,
                                width: cascade.width * scale_x,
                                height: cascade.height * scale_y,
                                neighbor: 1,
                                confidence: sum
                            }), u8o[0] += 16, u8o[1] += 8, u8o[2] += 4;
                        }
                        u8o[0] += paddings[0], u8o[1] += paddings[1], u8o[2] += paddings[2];
                    }
                }
                scale_x *= scale, scale_y *= scale;
            }
            return seq;
        }

        function post(seq) {
            {
                var i, j, min_neighbors = this.shared.min_neighbors,
                    cascade = this.shared.cascade;
                this.shared.interval, this.shared.scale, this.shared.next, this.shared.scale_upto;
            }
            for (i = 0; i < cascade.stage_classifier.length; i++) cascade.stage_classifier[i].feature = cascade.stage_classifier[i].orig_feature;
            if (seq = seq[0], min_neighbors > 0) {
                var result = ccv.array_group(seq, function(r1, r2) {
                        var distance = Math.floor(.25 * r1.width + .5);
                        return r2.x <= r1.x + distance && r2.x >= r1.x - distance && r2.y <= r1.y + distance && r2.y >= r1.y - distance && r2.width <= Math.floor(1.5 * r1.width + .5) && Math.floor(1.5 * r2.width + .5) >= r1.width;
                    }),
                    ncomp = result.cat,
                    idx_seq = result.index,
                    comps = new Array(ncomp + 1);
                for (i = 0; i < comps.length; i++) comps[i] = {
                    neighbors: 0,
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0,
                    confidence: 0
                };
                for (i = 0; i < seq.length; i++) {
                    var r1 = seq[i],
                        idx = idx_seq[i];
                    0 == comps[idx].neighbors && (comps[idx].confidence = r1.confidence), ++comps[idx].neighbors,
                        comps[idx].x += r1.x, comps[idx].y += r1.y, comps[idx].width += r1.width, comps[idx].height += r1.height,
                        comps[idx].confidence = Math.max(comps[idx].confidence, r1.confidence);
                }
                var seq2 = [];
                for (i = 0; ncomp > i; i++) {
                    var n = comps[i].neighbors;
                    n >= min_neighbors && seq2.push({
                        x: (2 * comps[i].x + n) / (2 * n),
                        y: (2 * comps[i].y + n) / (2 * n),
                        width: (2 * comps[i].width + n) / (2 * n),
                        height: (2 * comps[i].height + n) / (2 * n),
                        neighbors: comps[i].neighbors,
                        confidence: comps[i].confidence
                    });
                }
                var result_seq = [];
                for (i = 0; i < seq2.length; i++) {
                    var r1 = seq2[i],
                        flag = !0;
                    for (j = 0; j < seq2.length; j++) {
                        var r2 = seq2[j],
                            distance = Math.floor(.25 * r2.width + .5);
                        if (i != j && r1.x >= r2.x - distance && r1.y >= r2.y - distance && r1.x + r1.width <= r2.x + r2.width + distance && r1.y + r1.height <= r2.y + r2.height + distance && (r2.neighbors > Math.max(3, r1.neighbors) || r1.neighbors < 3)) {
                            flag = !1;
                            break;
                        }
                    }
                    flag && result_seq.push(r1);
                }
                return result_seq;
            }
            return seq;
        }
        if (void 0 !== this.shared) {
            var params = arguments[0];
            console.log(params)
            this.shared.canvas = params.canvas, this.shared.interval = params.interval, this.shared.min_neighbors = params.min_neighbors,
                this.shared.cascade = params.cascade, this.shared.scale = Math.pow(2, 1 / (params.interval + 1)),
                this.shared.next = params.interval + 1, this.shared.scale_upto = Math.floor(Math.log(Math.min(params.canvas.width / params.cascade.width, params.canvas.height / params.cascade.height)) / Math.log(this.shared.scale));
            var i;
            for (i = 0; i < this.shared.cascade.stage_classifier.length; i++) this.shared.cascade.stage_classifier[i].orig_feature = this.shared.cascade.stage_classifier[i].feature;
        }
        return {
            pre: pre,
            core: core,
            post: post
        };
    })
};