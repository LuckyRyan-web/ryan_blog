---
  title: Cookies 和 Session.md
  categories:  前端
---

1. **存储的位置不同**，cookie 的放在客户端浏览器上，session 的放在服务器上

2. **存储量不同**，单个 cookie 保存的数据为 <= 4KB，一个站点最多存储 20 个 Cookie，而对于 Session 来说没有上限

3. **存储方式不同**，Cookie 只能存储 ASCII 字符串，并需要通过编码的方式存储为 Unicode 字符串或二进制数据。Session 中可以存储为任何数据类型的数据

4. **有效期上不同**，开发可以设置 cookie 属性来达到 cookie 长期有效的效果，Session 关闭浏览器就会失效

5. **跨域支持上不同**，Cookie 支持域名跨域，Session 不支持域名访问