export default class NavigationUtil {
    static goPage(params, page) {
        NavigationUtil.navigation.navigate(page, { ...params });
    }
    static pushPage(params, page) {
        NavigationUtil.navigation.push(page, { ...params });
    }
    static goBack(navigation) {
        navigation.goBack();
    }
    static resetToHomePage(params) {
        let { navigation } = params;
        navigation.navigate('Main');
    }
}