import React from "react";

function SwitcherLang(props) {

    const { langKey, switchFn } = props;

    return (<div>
        {langKey.map(lang => {
            if (lang === "CurrentLang") return;
            return <button onClick={() => switchFn(lang)}>{lang}</button>
        })}
    </div>
    )


}


export default React.memo(SwitcherLang);