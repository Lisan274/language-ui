import React, { useState, useEffect } from "react";

import Header from "../components/header";
import Footer from "../components/footer";
import Subheader from "../components/subheader";
import Card from "../components/card";

import { ILanguage } from "../interfaces/language";

import { getLanguages } from "../services/languages";
import { useParams } from "react-router-dom";

import { GetlanguagessByIdCategorie } from "../services/categories"

const Languagecategories: React.FC = () => {

    const [languages, setLanguages] = useState([]);
    const [update, setUpdate] = useState(true);
    const [categoria, setCategoria] = useState(" ");
    const { _id } = useParams();

    useEffect(() => {
        if (update) {
            if (_id != undefined) {
                GetlanguagessByIdCategorie(_id).then(r => {
                    setUpdate(false);
                    setLanguages(r.data);
                    setCategoria(r.data.category[0].name);
                });
            } else {
                getLanguages().then(r => {
                    setUpdate(false);
                    setLanguages(r.data);
                    setCategoria(r.data.name);
                });
            }
        }
    }, [update, categoria, _id]);

    useEffect(() => {
        return () => {
            console.log("cleaned up");
        };
    }, []);

    return (
        <div>
            <Header></Header>
            <div className="container">
                <Subheader title={categoria} ></Subheader>
                <div className="row text-center">
                    {languages.map((lan: ILanguage, index) => (
                        <Card
                            title={lan.name}
                            description={lan.description}
                            key={lan._id}
                            category={lan.category[0].name}
                            LanguageId={lan._id}
                        />
                    ))}
                </div>
            </div>
            <Footer></Footer>
        </div>
    );

}

export default Languagecategories;