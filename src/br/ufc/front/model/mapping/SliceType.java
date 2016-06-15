//
// Este arquivo foi gerado pela Arquitetura JavaTM para Implementação de Referência (JAXB) de Bind XML, v2.2.8-b130911.1802 
// Consulte <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Todas as modificações neste arquivo serão perdidas após a recompilação do esquema de origem. 
// Gerado em: 2016.01.19 às 07:30:36 PM BRT 
//


package br.ufc.front.model.mapping;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Classe Java de slice_type complex type.
 * 
 * <p>O seguinte fragmento do esquema especifica o conteúdo esperado contido dentro desta classe.
 * 
 * <pre>
 * &lt;complexType name="slice_type">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;attribute name="slice_id" type="{http://www.w3.org/2001/XMLSchema}int" />
 *       &lt;attribute name="inner_component_id" type="{http://www.w3.org/2001/XMLSchema}int" />
 *       &lt;attribute name="inner_unity_id" type="{http://www.w3.org/2001/XMLSchema}int" />
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "slice_type")
public class SliceType {

    @XmlAttribute(name = "slice_id")
    protected Integer sliceId;
    @XmlAttribute(name = "inner_component_id")
    protected Integer innerComponentId;
    @XmlAttribute(name = "inner_unity_id")
    protected Integer innerUnityId;

    /**
     * Obtém o valor da propriedade sliceId.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getSliceId() {
        return sliceId;
    }

    /**
     * Define o valor da propriedade sliceId.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setSliceId(Integer value) {
        this.sliceId = value;
    }

    /**
     * Obtém o valor da propriedade innerComponentId.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getInnerComponentId() {
        return innerComponentId;
    }

    /**
     * Define o valor da propriedade innerComponentId.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setInnerComponentId(Integer value) {
        this.innerComponentId = value;
    }

    /**
     * Obtém o valor da propriedade innerUnityId.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getInnerUnityId() {
        return innerUnityId;
    }

    /**
     * Define o valor da propriedade innerUnityId.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setInnerUnityId(Integer value) {
        this.innerUnityId = value;
    }

}
