import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as n,f as a}from"./app-efa5e96e.js";const d={},s=a(`<h2 id="_01、uppercase-大写" tabindex="-1"><a class="header-anchor" href="#_01、uppercase-大写" aria-hidden="true">#</a> 01、Uppercase （大写）</h2><blockquote><p>构造一个 Type 的所有属性都设置为大写的类型。</p></blockquote><div class="language-TypeScript line-numbers-mode" data-ext="TypeScript"><pre class="language-TypeScript"><code>type Role = &quot;admin&quot; | &quot;user&quot; | &quot;guest&quot;;
// 原始写法 
type UppercaseRole = &quot;ADMIN&quot; | &quot;USER&quot; | &quot;GUEST&quot;;
// 推荐写法 
type UppercaseRole = Uppercase&lt;Role&gt;; // &quot;ADMIN&quot; | &quot;USER&quot; | &quot;GUEST&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_02、-lowercase-小写" tabindex="-1"><a class="header-anchor" href="#_02、-lowercase-小写" aria-hidden="true">#</a> 02、 Lowercase (小写)</h2><blockquote><p>构造一个 Type 的所有属性都设置为小写的类型，与大写相反。</p></blockquote><div class="language-TypeScript line-numbers-mode" data-ext="TypeScript"><pre class="language-TypeScript"><code>type Role = &quot;ADMIN&quot; | &quot;USER&quot; | &quot;GUEST&quot;;
// 原始写法
type LowercaseRole = &quot;admin&quot; | &quot;user&quot; | &quot;guest&quot;;
// 推荐写法
type LowercaseRole = Lowercase&lt;Role&gt;; // &quot;admin&quot; | &quot;user&quot; | &quot;guest&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_03、capitalize-首字母大写" tabindex="-1"><a class="header-anchor" href="#_03、capitalize-首字母大写" aria-hidden="true">#</a> 03、Capitalize（首字母大写）</h2><blockquote><p>构造一个将 Type 的所有属性设置为大写的类型。</p></blockquote><div class="language-TypeScript line-numbers-mode" data-ext="TypeScript"><pre class="language-TypeScript"><code>type Role = &quot;admin&quot; | &quot;user&quot; | &quot;guest&quot;;
// 原始写法
type CapitalizeRole = &quot;Admin&quot; | &quot;User&quot; | &quot;Guest&quot;;
// 推荐写法
type CapitalizeRole = Capitalize&lt;Role&gt;; // &quot;Admin&quot; | &quot;User&quot; | &quot;Guest&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_04、uncapitalize-首字母小写" tabindex="-1"><a class="header-anchor" href="#_04、uncapitalize-首字母小写" aria-hidden="true">#</a> 04、Uncapitalize（首字母小写）</h2><blockquote><p>构造一个将 Type 的所有属性设置为 uncapitalize 的类型，与首字母大写相反。</p></blockquote><div class="language-TypeScript line-numbers-mode" data-ext="TypeScript"><pre class="language-TypeScript"><code>type Role = &quot;Admin&quot; | &quot;User&quot; | &quot;Guest&quot;;
// 原始写法
type UncapitalizeRole = &quot;admin&quot; | &quot;user&quot; | &quot;guest&quot;;
// 推荐写法
type UncapitalizeRole = Uncapitalize&lt;Role&gt;; // &quot;admin&quot; | &quot;user&quot; | &quot;guest&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_05、partial-可选" tabindex="-1"><a class="header-anchor" href="#_05、partial-可选" aria-hidden="true">#</a> 05、Partial（可选）</h2><blockquote><p>构造一个类型，其中 Type 的所有属性都设置为可选。</p></blockquote><div class="language-TypeScript line-numbers-mode" data-ext="TypeScript"><pre class="language-TypeScript"><code>interface User {
  name: string;
  age: number;
  password: string;
}
// 原始写法
interface PartialUser {
  name?: string;
  age?: number;
  password?: string;
}
// 推荐写法
type PartialUser = Partial&lt;User&gt;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_06、required-必选" tabindex="-1"><a class="header-anchor" href="#_06、required-必选" aria-hidden="true">#</a> 06、Required（必选）</h2><blockquote><p>构造一个类型，该类型由设置为 required 的 Type 的所有属性组成，Opposite的对面。</p></blockquote><div class="language-TypeScript line-numbers-mode" data-ext="TypeScript"><pre class="language-TypeScript"><code>interface User {
  name?: string;
  age?: number;
  password?: string;
}
// 原始写法
interface RequiredUser {
  name: string;
  age: number;
  password: string;
}
// 推荐写法
type RequiredUser = Required&lt;User&gt;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_07、readonly-只读" tabindex="-1"><a class="header-anchor" href="#_07、readonly-只读" aria-hidden="true">#</a> 07、Readonly（只读）</h2><blockquote><p>构造一个类型，该类型由设置为只读的 Type 的所有属性组成。</p></blockquote><div class="language-TypeScript line-numbers-mode" data-ext="TypeScript"><pre class="language-TypeScript"><code>interface User {
  role: string;
}
// 原始写法
const user: User = { role: &quot;ADMIN&quot; };
user.role = &quot;USER&quot;;
// 推荐写法
type ReadonlyUser = Readonly&lt;User&gt;;
const user: ReadonlyUser = { role: &quot;ADMIN&quot; };
user.role = &quot;USER&quot;; // Error: Cannot assign to &#39;role&#39; because it is a read-only property.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_08、record" tabindex="-1"><a class="header-anchor" href="#_08、record" aria-hidden="true">#</a> 08、Record</h2><blockquote><p>构造一个具有一组类型 T 的属性 K 的类型，每个属性 K 都映射到类型 T。</p></blockquote><div class="language-TypeScript line-numbers-mode" data-ext="TypeScript"><pre class="language-TypeScript"><code>interface Address {
  street: string;
  pin: number;
}
interface Addresses {
  home: Address;
  office: Address;
}
// Alternative ✅
type AddressesRecord = Record&lt;&quot;home&quot; | &quot;office&quot;, Address&gt;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_09、pick" tabindex="-1"><a class="header-anchor" href="#_09、pick" aria-hidden="true">#</a> 09、Pick</h2><blockquote><p>只选择键在联合类型键中的 Type 的属性。</p></blockquote><div class="language-TypeScript line-numbers-mode" data-ext="TypeScript"><pre class="language-TypeScript"><code>interface User {
  name: string;
  age: number;
  password: string;
}
// 原始写法
interface UserPartial {
  name: string;
  age: number;
}
// 推荐写法
type UserPartial = Pick&lt;User, &quot;name&quot; | &quot;age&quot;&gt;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_10、omit" tabindex="-1"><a class="header-anchor" href="#_10、omit" aria-hidden="true">#</a> 10、Omit</h2><blockquote><p>Omit其键在联合类型键中的 Type 属性。</p></blockquote><div class="language-TypeScript line-numbers-mode" data-ext="TypeScript"><pre class="language-TypeScript"><code>interface User {
  name: string;
  age: number;
  password: string;
}
// 原始写法
interface UserPartial {
  name: string;
  age: number;
}
// 推荐写法
type UserPartial = Omit&lt;User, &quot;password&quot;&gt;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_11、exclude" tabindex="-1"><a class="header-anchor" href="#_11、exclude" aria-hidden="true">#</a> 11、Exclude</h2><blockquote><p>构造一个具有 Type 的所有属性的类型，除了键在联合类型 Excluded 中的那些。</p></blockquote><div class="language-TypeScript line-numbers-mode" data-ext="TypeScript"><pre class="language-TypeScript"><code>type Role = &quot;ADMIN&quot; | &quot;USER&quot; | &quot;GUEST&quot;;
// 原始写法
type NonAdminRole = &quot;USER&quot; | &quot;GUEST&quot;;
// 推荐写法
type NonAdmin = Exclude&lt;Role, &quot;ADMIN&quot;&gt;; // &quot;USER&quot; | &quot;GUEST&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_12、extract" tabindex="-1"><a class="header-anchor" href="#_12、extract" aria-hidden="true">#</a> 12、Extract</h2><blockquote><p>构造一个具有 Type 的所有属性的类型，其键在联合类型 Extract 中。</p></blockquote><div class="language-TypeScript line-numbers-mode" data-ext="TypeScript"><pre class="language-TypeScript"><code>type Role = &quot;ADMIN&quot; | &quot;USER&quot; | &quot;GUEST&quot;;
// 原始写法
type AdminRole = &quot;ADMIN&quot;;
// 推荐写法
type Admin = Extract&lt;Role, &quot;ADMIN&quot;&gt;; // &quot;ADMIN&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_13、nonnullable" tabindex="-1"><a class="header-anchor" href="#_13、nonnullable" aria-hidden="true">#</a> 13、NonNullable</h2><blockquote><p>构造一个类型，其中 Type 的所有属性都设置为不可为空。</p></blockquote><div class="language-TypeScript line-numbers-mode" data-ext="TypeScript"><pre class="language-TypeScript"><code>type Role = &quot;ADMIN&quot; | &quot;USER&quot; | null;
// 原始写法
type NonNullableRole = &quot;ADMIN&quot; | &quot;USER&quot;;
// 推荐写法
type NonNullableRole = NonNullable&lt;Role&gt;; // &quot;ADMIN&quot; | &quot;USER&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,39),l=[s];function r(t,u){return i(),n("div",null,l)}const v=e(d,[["render",r],["__file","15.TypeScript技巧-类型.html.vue"]]);export{v as default};
