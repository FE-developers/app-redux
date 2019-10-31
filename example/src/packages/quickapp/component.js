export default function page(conf){

    /***
     * 保持组件与页面写法一致
     * 将除生命周期外的所有方法添加到methods
     */

    if(conf.onShow) throw '遵循快应用规范，在组件周期内没有onShow生命周期';
    if(conf.onHide) throw '遵循快应用规范，在组件周期内没有onShow生命周期';

    const _Init = conf.onInit;

    // 强制改为组件的数据模型
    conf.data = {
        ...(conf.data||{}),
        ...(conf.private||{}),
        ...(conf.public||{}),
        ...(conf.protected||{})
    }

    delete conf.private;
    delete conf.public;
    delete conf.protected;

    conf.onInit = async function(){
        conf.beforeRouteEnter && (await conf.beforeRouteEnter.call(this,...arguments));
        this.$on('page_init_end',async () => {
            _Init && await _Init.call(this,...arguments);   
        });
    };

    return conf;
}