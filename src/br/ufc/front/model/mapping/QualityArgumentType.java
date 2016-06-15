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
 * <p>Classe Java de quality_argument_type complex type.
 * 
 * <p>O seguinte fragmento do esquema especifica o conteúdo esperado contido dentro desta classe.
 * 
 * <pre>
 * &lt;complexType name="quality_argument_type">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="function" type="{http://storm.lia.ufc.br}quality_function_type" minOccurs="0"/>
 *       &lt;/sequence>
 *       &lt;attribute name="qp_id" type="{http://www.w3.org/2001/XMLSchema}int" />
 *       &lt;attribute name="value" type="{http://www.w3.org/2001/XMLSchema}double" />
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "quality_argument_type", propOrder = {
    "function"
})
public class QualityArgumentType {

    protected QualityFunctionType function;
    @XmlAttribute(name = "qp_id")
    protected Integer qpId;
    @XmlAttribute(name = "value")
    protected Double value;

    /**
     * Obtém o valor da propriedade function.
     * 
     * @return
     *     possible object is
     *     {@link QualityFunctionType }
     *     
     */
    public QualityFunctionType getFunction() {
        return function;
    }

    /**
     * Define o valor da propriedade function.
     * 
     * @param value
     *     allowed object is
     *     {@link QualityFunctionType }
     *     
     */
    public void setFunction(QualityFunctionType value) {
        this.function = value;
    }

    /**
     * Obtém o valor da propriedade qpId.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getQpId() {
        return qpId;
    }

    /**
     * Define o valor da propriedade qpId.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setQpId(Integer value) {
        this.qpId = value;
    }

    /**
     * Obtém o valor da propriedade value.
     * 
     * @return
     *     possible object is
     *     {@link Double }
     *     
     */
    public Double getValue() {
        return value;
    }

    /**
     * Define o valor da propriedade value.
     * 
     * @param value
     *     allowed object is
     *     {@link Double }
     *     
     */
    public void setValue(Double value) {
        this.value = value;
    }

}
