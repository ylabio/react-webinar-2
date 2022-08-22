import React from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { Field, Form, ErrorMessage, Formik } from "formik";
import * as Yup from "yup";

function Forms(props) {
  const cn = bem("Forms");

  return (
    <div className={cn()}>
      <h2>Вход</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .min(3, "Минимум 3 символа")
            .required("Обязательное поле"),
          password: Yup.string()
            .min(3, "Минимум 3 символа")
            .required("Обязательное поле"),
        })}
        onSubmit={(values) => {
          props.onSubmit(values.email, values.password);
        }}
      >
        {() => (
          <Form onClick={props.clearError}>
            <div className={cn("field-email")}>
              <div>Логин</div>
              <Field type={"text"} name={"email"} required />
              <ErrorMessage component="div" className="error" name="email" />
            </div>
            <div className={cn("field-password")}>
              <div>Пароль</div>
              <Field type={"password"} name={"password"} required />
              <ErrorMessage component="div" className="error" name="password" />

              <div className={cn("error")}>{props.error}</div>
            </div>
            <button type={"submit"}>Войти</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default React.memo(Forms);
