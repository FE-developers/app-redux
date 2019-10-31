export default function page(conf){
    const onInit = conf.onInit;
    const onShow = conf.onShow;
    const onHide = conf.onHide;

    if(conf.protected) console.error('page 页面内无需使用 protected,请使用 public 替代组件传参');
    
    conf.onInit = async function(){
        this.$app.beforeRouteEnter && (await this.$app.beforeRouteEnter());
        const isStop = conf.beforeRouteEnter && (await conf.beforeRouteEnter.call(this));
        if(isStop) return;
        onInit && (await onInit.call(this,...arguments));
        this.$broadcast('page_init_end');
    }
    
    conf.onShow = async function(){
        if(this.__hide) {
            this.$app.beforeRouteUpdate && (await this.$app.beforeRouteUpdate());
            conf.beforeRouteUpdate && (await conf.beforeRouteUpdate.call(this));
            onShow && (await onShow.call(this,...arguments));
        }
    }

    conf.onHide = async function(){
        this.__hide = true;
        this.$app.beforeRouteLeave && (await this.$app.beforeRouteLeave());
        conf.beforeRouteLeave && (await conf.beforeRouteLeave.call(this));
        onHide && (await onHide.call(this,...arguments));
    }

    delete conf.onBackPress;

    return conf;
}