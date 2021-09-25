import '../styles/globals.css';
import AppLayout from "../components/AppLayout";
import moment from "moment";
import 'moment/locale/vi'
import GlobalContextProvider from "../contexts/GlobalContext";

const MyApp = ({ Component, pageProps }) => {
    moment.locale('vi');
    return (
        <GlobalContextProvider>
            <AppLayout>
                <Component {...pageProps} />
            </AppLayout>
        </GlobalContextProvider>
    )
}

export default MyApp;

