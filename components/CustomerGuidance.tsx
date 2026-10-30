import React from 'react';
import {Link,useLocation} from 'react-router-dom';
import {useLanguage} from '../hooks/useLanguage';
import {customerGuidance,referenceTipIndex} from '../locales/customerGuidance';
export function CustomerGuidance({indices=[0,1,2,3,4,5],cards=false,steps=false,showSources=false}:{indices?:number[];cards?:boolean;steps?:boolean;showSources?:boolean}){
 const {language}=useLanguage();const copy=customerGuidance[language];const location=useLocation();
 return <section className={`customer-guidance ${cards?'guidance-cards':''} ${steps?'guidance-steps':''}`} data-customer-guidance>
 <h2>{copy.title}</h2><p className="guidance-scope">{copy.scope}</p>
 <div className="guidance-answers">{indices.map((index,position)=>{const [question,answer]=copy.questions[index];return (cards||steps)?<article key={index} id={`fabric-question-${index+1}`}><h3>{steps&&<span className="guidance-step-number" aria-hidden="true">{String(position+1).padStart(2,'0')} / </span>}{question}</h3><p>{answer}</p></article>:<details key={index} id={`fabric-question-${index+1}`}><summary>{question}</summary><p>{answer}</p></details>;})}</div>
 <Link className="guidance-link" to={location.pathname==='/sourcing-guide'?'/contact':'/sourcing-guide'}>{copy.link} ↗</Link>
 {showSources&&<p className="guidance-sources">{copy.sources}: <a href="https://cottonworks.com/learning-hub/quality-assurance/quality-assurance-basics/">CottonWorks — Quality Assurance Basics</a> · <a href="https://www.ginetex.net/en/care-labelling/">GINETEX — Care Labelling</a></p>}
 </section>;
}
export function ProductSampleTip({fabricId}:{fabricId:string}){
 const {language}=useLanguage();const copy=customerGuidance[language];const tip=copy.tips[referenceTipIndex[fabricId]];
 if(!tip)return null;
 return <aside className="product-sample-tip" data-product-sample-tip><h2>{copy.productLabel}</h2><p>{tip}</p><p className="guidance-scope">{copy.evidence}</p><Link className="guidance-link" to={`/contact?fabric=${encodeURIComponent(fabricId)}`}>{copy.link} ↗</Link></aside>;
}
