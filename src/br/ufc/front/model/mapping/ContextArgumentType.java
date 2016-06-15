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
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Classe Java de context_argument_type complex type.
 * 
 * <p>O seguinte fragmento do esquema especifica o conteúdo esperado contido dentro desta classe.
 * 
 * <pre>
 * &lt;complexType name="context_argument_type">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;choice>
 *           &lt;element name="cp_id" type="{http://www.w3.org/2001/XMLSchema}int" minOccurs="0"/>
 *           &lt;element name="context_contract" type="{http://storm.lia.ufc.br}context_contract"/>
 *           &lt;element name="value" type="{http://storm.lia.ufc.br}context_argument_value_type"/>
 *         &lt;/choice>
 *       &lt;/sequence>
 *       &lt;attribute name="cc_id" type="{http://www.w3.org/2001/XMLSchema}int" />
 *       &lt;attribute name="variable_cp_id" type="{http://www.w3.org/2001/XMLSchema}int" />
 *       &lt;attribute name="bound_cc_id" type="{http://www.w3.org/2001/XMLSchema}int" />
 *       &lt;attribute name="ca_id" type="{http://www.w3.org/2001/XMLSchema}int" />
 *       &lt;attribute name="kind" type="{http://www.w3.org/2001/XMLSchema}int" />
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "context_argument_type", propOrder = {
    "cpId",
    "contextContract",
    "value"
})
public class ContextArgumentType {

    @XmlElement(name = "cp_id")
    protected Integer cpId;
    @XmlElement(name = "context_contract")
    protected ContextContract contextContract;
    protected ContextArgumentValueType value;
    @XmlAttribute(name = "cc_id")
    protected Integer ccId;
    @XmlAttribute(name = "variable_cp_id")
    protected Integer variableCpId;
    @XmlAttribute(name = "bound_cc_id")
    protected Integer boundCcId;
    @XmlAttribute(name = "ca_id")
    protected Integer caId;
    @XmlAttribute(name = "kind")
    protected Integer kind;

    /**
     * Obtém o valor da propriedade cpId.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getCpId() {
        return cpId;
    }

    /**
     * Define o valor da propriedade cpId.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setCpId(Integer value) {
        this.cpId = value;
    }

    /**
     * Obtém o valor da propriedade contextContract.
     * 
     * @return
     *     possible object is
     *     {@link ContextContract }
     *     
     */
    public ContextContract getContextContract() {
        return contextContract;
    }

    /**
     * Define o valor da propriedade contextContract.
     * 
     * @param value
     *     allowed object is
     *     {@link ContextContract }
     *     
     */
    public void setContextContract(ContextContract value) {
        this.contextContract = value;
    }

    /**
     * Obtém o valor da propriedade value.
     * 
     * @return
     *     possible object is
     *     {@link ContextArgumentValueType }
     *     
     */
    public ContextArgumentValueType getValue() {
        return value;
    }

    /**
     * Define o valor da propriedade value.
     * 
     * @param value
     *     allowed object is
     *     {@link ContextArgumentValueType }
     *     
     */
    public void setValue(ContextArgumentValueType value) {
        this.value = value;
    }

    /**
     * Obtém o valor da propriedade ccId.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getCcId() {
        return ccId;
    }

    /**
     * Define o valor da propriedade ccId.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setCcId(Integer value) {
        this.ccId = value;
    }

    /**
     * Obtém o valor da propriedade variableCpId.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getVariableCpId() {
        return variableCpId;
    }

    /**
     * Define o valor da propriedade variableCpId.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setVariableCpId(Integer value) {
        this.variableCpId = value;
    }

    /**
     * Obtém o valor da propriedade boundCcId.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getBoundCcId() {
        return boundCcId;
    }

    /**
     * Define o valor da propriedade boundCcId.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setBoundCcId(Integer value) {
        this.boundCcId = value;
    }

    /**
     * Obtém o valor da propriedade caId.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getCaId() {
        return caId;
    }

    /**
     * Define o valor da propriedade caId.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setCaId(Integer value) {
        this.caId = value;
    }

    /**
     * Obtém o valor da propriedade kind.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getKind() {
        return kind;
    }

    /**
     * Define o valor da propriedade kind.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setKind(Integer value) {
        this.kind = value;
    }

}
