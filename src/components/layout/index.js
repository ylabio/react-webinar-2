import React, {useState, useEffect} from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';

function Layout(props) {
    const cn = bem('Layout');

    const [styleRu, setStyleRu] = useState({backgroundColor: "paleturquoise"});
    const [styleEn, setStyleEn] = useState({backgroundColor: "#11ffee00"});

    useEffect(() => {
        switch (props.changeLang) {
            case 'ru':
                setStyleRu({backgroundColor: "paleturquoise"});
                setStyleEn({backgroundColor: "#11ffee00"});
                break;
            case 'en':
                setStyleRu({backgroundColor: "#11ffee00"});
                setStyleEn({backgroundColor: "paleturquoise"});
                break;
            default:
                break;
        }
    }, [props.changeLang])

    return (
        <div className={cn()}>
            <div className={cn('head')}>
                {props.head}
                <div className={cn('lang_ru')} style={styleRu} onClick={() => props.setChangeLang('ru')}>ru</div>
                <div className={cn('lang_en')} style={styleEn} onClick={() => props.setChangeLang('en')}>en</div>
            </div>
            <div className={cn('content')}>
                {props.children}
            </div>
        </div>
    )
}

Layout.propTypes = {
    head: propTypes.node,
    children: propTypes.node,
    changeLang: propTypes.string.isRequired,
    setChangeLang: propTypes.func,
}

Layout.defaultProps = {
    setChangeLang: () => {
    },
}

export default React.memo(Layout);
