import React from "react";
import counter from "../../utils/counter";

function SwitcherLang(props) {

    const { langKey, switchFn } = props;

    return (<div>
        {langKey.map(lang => {
            if (lang === "CurrentLang") return;
            return <button key={counter()} onClick={() => switchFn(lang)}>{lang}</button>
        })}
    </div>
    )


}


export default React.memo(SwitcherLang);