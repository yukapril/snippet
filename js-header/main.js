HEADER.setTitle('test 测试测试');

HEADER.btns.add({
    name: 'order',
    position: 'right',
    text: '我的订单',
    handle: function (e) {
        console.log('click:order', this, e);
    }
});

HEADER.btns.add({
    name: 'menu',
    position: 'right',
    icon: 'icon-category',
    handle: function (e) {
        console.log('click:menu', this, e);
    }
});

HEADER.btns.add({
    position: 'left',
    name: 'close',
    icon: 'icon-close',
    handle: () => {
        console.log('click:close');
    }
});

HEADER.btns.set('back', {
    handle: () => {
        console.log('click:back');
    }
});