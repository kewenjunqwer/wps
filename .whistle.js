exports.name = `kewenjun`; // 仅需修改第1行为你的wps.cn邮箱地址
const path = require('path');
const STATIC_PATH = path.resolve(__dirname, 'HOMEWORK');
exports.groupName = '前端专业班2023-大作业考核';
exports.rules = `
### 表单3.0- 新首页  94端口  发开自己配置
kewenjun.wps.cn 127.0.0.1:5173

120.92.124.158 account.wps.cn apivip.wps.cn notice.wps.cn openapi.wps.cn qr.wps.cn docs.wps.cn tethysdb.wps.cn batch-download.wps.cn adm.wps.cn dmc.wps.cn pay.inner.wps.cn kms.wps.cn
120.92.124.158 qing.wps.cn drive.wps.cn mdrive.wps.cn roaming.wps.cn open.wps.cn zw-roaming.wps.cn zj-roaming.wps.cn
120.92.124.158 geo.wps.cn qwps.com wpsplus.com plus.wps.cn plussvr.wps.cn work.wps.cn store.wps.cn portal.wps.cn securitydoc.wps.cn convertor.wps.cn
120.92.43.125 preview.wps.cn
120.92.124.158 docer.kdocs.cn plus.kdocs.cn plussvr.kdocs.cn store.kdocs.cn drive.kdocs.cn account.kdocs.cn open.kdocs.cn rili.kdocs.cn
120.92.124.158 drive.kdocs.cn docer-api.kdocs.cn geo.wps.cn vas.wps.cn  vas.kdocs.cn
120.92.124.158 admin-vip.wps.cn vip.wps.cn v3.vip.wps.cn vasapi.wps.cn vasapi.internal.wps.cn vipapi.wps.cn vipapi.internal.wps.cn pay.wps.cn le.wps.cn zt.wps.cn act.docer.com act.wps.cn home.wps.cn mall.wps.cn miniapp.wps.cn s1.vip.wpscdn.cn s2.vip.wpscdn.cn s3.vip.wpscdn.cn s4.vip.wpscdn.cn s5.vip.wpscdn.cn s6.vip.wpscdn.cn
#processon
120.92.77.249 wps.processon.com
120.92.116.140 www.docer.com
120.92.19.197 docer.apidoc.com
120.92.88.237 open.docer.wps.cn
120.92.117.12 docer.wps.cn
120.92.124.158 client.docer.wps.cn
120.131.2.20 dweb-modou.wps.cn
120.92.124.158 dynamicedu.wps.cn
120.92.124.158 rili.wps.cn et.wps.cn
120.92.124.158 rv.ksoapp.com api.rv.ksoapp.com 
120.92.15.97 msgpush.wps.cn
120.92.124.158 msgnotify.wps.cn
120.92.124.158 pushapi.psvr.wps.cn

#op
120.92.124.158 webform.docer.wps.cn
120.92.124.158 msgcenter.wps.cn msgcenter.kdocs.cn loginweb.wps.cn loginweb.kdocs.cn ksopush.kdocs.cn docteam.wps.cn 
120.92.124.158 note.wps.cn note-api.wps.cn
120.92.124.158 fileoperate.kdocs.cn fileoperate-internal.wps.cn editpv-internal.wps.cn
10.13.34.11 web.wps.cn www.kdocs.cn docs.wps.cn ops.wps.cn c.kdocs.cn weboffice-test.wps.cn
10.13.34.11 ops.k8s.cn 
10.23.10.111 f.wps.cn
10.23.10.111 f-api.wps.cn
10.23.10.111 f.kdocs.cn
10.23.10.111 f-api.kdocs.cn
120.92.124.158 contact.internal.kdocs.cn
120.92.124.158 fs.kdocs.cn
120.92.124.158 private.internal.kdocs.cn
120.92.124.158 form-webshot.kdocs.cn
10.23.10.111 dc.kdocs.cn
10.23.10.111 adc.wps.cn
120.92.124.158 t.kdocs.cn
120.92.124.158 t.wps.cn
120.92.124.158 pocket.wps.cn
10.23.10.111 f.wps.cn forme.doc.wps.cn yapi.kdocs.wps.cn

# wps客户端权益中心host绑定
120.92.124.158 moweb.docer.wps.cn
120.92.124.158 honeycomb-adm-test.wps.cn
120.92.124.158 res-honeycomb.wpscdn.cn
120.92.124.158 honeycomb.wpscdn.cn
120.92.124.158 honeycomb.wps.cn
10.23.10.111 forme.doc.wps.cn
`;
