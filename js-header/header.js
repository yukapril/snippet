const HEADER = {
    $el: null,
    $left: null,
    $title: null,
    $right: null,

    event(){
        let _this = this;
        this.$el.addEventListener('click', (e) => {
            let $el = e.target;
            while (true) {
                if ($el.tagName.toLowerCase() === 'header') break;
                if ($el.tagName.toLowerCase() === 'div' && $el.className === 'btn') {
                    let btnName = $el.dataset.role;
                    let handle = _this.btns.get(btnName).handle;
                    handle.call($el, e);
                    break;
                } else {
                    $el = $el.parentElement;
                }
            }
        });
    },

    init(el){
        el = el || '#J_Header';
        let $el = document.querySelector(el);
        this.$el = $el;
        this.$left = document.createElement('div');
        this.$left.className = 'left';
        this.$title = document.createElement('div');
        this.$title.className = 'title';
        this.$right = document.createElement('div');
        this.$right.className = 'right';
        let fragment = document.createDocumentFragment();
        fragment.appendChild(this.$left);
        fragment.appendChild(this.$title);
        fragment.appendChild(this.$right);
        $el.appendChild(fragment);
        this.event();
    },

    btns: (() => {
        let btns = {};
        return {
            add(opt){
                btns[opt.name] = opt;
                HEADER.render(opt.name);
            },
            remove(name){
                delete btns[name];
                HEADER.render(name, {isRemove: true});
            },
            set(name, opt){
                if (opt.name || opt.position) {
                    throw new Error(`Can't set name/position.`);
                }
                btns[name] = opt;
                if (opt.icon) {
                    HEADER.render(name, {isModify: true});
                }
            },
            get(name){
                if (name) return btns[name];
                return btns;
            }
        }
    })(),

    setTitle(str) {
        this.$title.innerText = str;
        document.title = str;
    },

    render(name, opts){
        opts = opts || {};

        let $el = this.$left.querySelector('[data-role="' + name + '"]');
        let btnOpt = this.btns.get(name);

        if (opts.isRemove) {
            $el.remove();
            return;
        }

        if (opts.isModify) {
            $el.querySelector('span').className = 'iconfont ' + btnOpt.icon;
            return;
        }

        let icon = document.createElement('div');
        icon.className = 'btn';
        icon.dataset.role = name;
        if (btnOpt.icon) {
            icon.innerHTML = '<span class="iconfont ' + btnOpt.icon + '"></span>';
        } else if (btnOpt.text) {
            icon.innerHTML = '<span>' + btnOpt.text + '</span>';
        }

        if (btnOpt.position === 'left') this.$left.appendChild(icon);
        else if (btnOpt.position === 'right') this.$right.appendChild(icon);
    }
};

HEADER.init();

HEADER.setTitle(document.title);
HEADER.btns.add({
    name: 'back',
    position: 'left',
    icon: 'icon-back',
    handle: () => {
        window.history.go(-1);
    }
});
