import React from "react";
import LoadingIndicator from "../../components/LoadingIndicator";
import loadable from "../../components/Loadable";

export default loadable(() => import("./PersonalInfoPage"), {
    fallback: <LoadingIndicator />,
});