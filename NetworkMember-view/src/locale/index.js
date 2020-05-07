import Vue from 'vue'
import VueI18n from 'vue-i18n'
import customZhCn from './lang-zh-cn/zh-CN'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import locale from 'element-ui/lib/locale'

Vue.use(VueI18n)

const messages = {
    'zh-CN': Object.assign(zhLocale,customZhCn)
}

const i18n = new VueI18n({
    locale: 'zh-CN',
    messages
})

locale.i18n((key, value) => i18n.t(key, value)) //重点：为了实现element插件的多语言切换
export default i18n
