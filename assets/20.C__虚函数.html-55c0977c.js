import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as n,f as l}from"./app-efa5e96e.js";const d={},s=l(`<h2 id="c-虚函数" tabindex="-1"><a class="header-anchor" href="#c-虚函数" aria-hidden="true">#</a> C++ 虚函数</h2><blockquote><p>C++的虚函数是一种特殊的成员函数，可以在派生类中被重写。</p><p>虚函数的作用是实现多态性，当我们使用基类指针或引用来调用虚函数时，程序会根据实际的对象类型来调用相应的派生类函数。</p><p>我们可以将一个成员函数声明为虚函数，只需要在函数声明前加上关键字 virtual 即可。比如这样：</p></blockquote><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>class Base {
public:
    virtual void func() {
        // ...
    }
};

class Derived : public Base {
public:
    void func() override {
        // ...
    }
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="c-虚函数案例" tabindex="-1"><a class="header-anchor" href="#c-虚函数案例" aria-hidden="true">#</a> C++ 虚函数案例</h2><blockquote><p>为方便读者理解，小林写个虚函数 demo：</p></blockquote><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code># include &lt;iostream&gt;

using namespace std;

class Shape {
public:
    virtual void draw() {
        cout &lt;&lt; &quot;绘制形状&quot; &lt;&lt; endl;
    }
};

class Circle : public Shape {
public:
    void draw() override {
        cout &lt;&lt; &quot;画一个圆圈&quot; &lt;&lt; endl;
    }
};

int main() {
    Shape*shape1 = new Shape();
    Shape* shape2 = new Circle();

    shape1-&gt;draw();
    shape2-&gt;draw();

    delete shape1;
    delete shape2;

    return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述小林写的 demo 中，我定义了一个基类 Shape 和一个派生类 Circle，其中 Shape 类中的 draw() 函数被声明为虚函数。</p><p>在主函数中，小林分别使用基类指针 shape1 和派生类指针 shape2 来调用 draw() 函数。</p><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>编译运行结果：

绘制形状
画一个圆圈

--------------------------------
Process exited after 0.1217 seconds with return value 0
请按任意键继续. . .
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="c-虚函数注意事项" tabindex="-1"><a class="header-anchor" href="#c-虚函数注意事项" aria-hidden="true">#</a> C++ 虚函数注意事项</h2><ul><li>虚函数只能是类的成员函数，不能是静态成员函数或全局函数。</li><li>构造函数和析构函数不能是虚函数，因为它们的调用顺序是确定的，不需要动态确定。</li><li>如果一个类中有虚函数，它必须有至少一个虚函数被实现，否则编译器会报错。</li><li>在派生类中重写虚函数时，函数签名必须与基类中的虚函数完全相同，否则编译器会报错。</li><li>如果派生类中重写虚函数时不使用 override 关键字，编译器会给出警告，但不会报错。</li><li>虚函数的调用会带来额外的开销，因为程序需要在运行时查找正确的函数地址。因此，在程序中过多地使用虚函数可能会影响性能。</li><li>如果在基类中将虚函数声明为纯虚函数，派生类必须实现该函数，否则派生类也会成为抽象类，无法实例化。</li></ul>`,11),a=[s];function c(v,r){return i(),n("div",null,a)}const t=e(d,[["render",c],["__file","20.C__虚函数.html.vue"]]);export{t as default};
