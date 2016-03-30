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
 * <p>Classe Java de context_parameter_type complex type.
 * 
 * <p>O seguinte fragmento do esquema especifica o conteúdo esperado contido dentro desta classe.
 * 
 * <pre>
 * &lt;complexType name="context_parameter_type">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="bound" type="{http://storm.lia.ufc.br}context_contract" minOccurs="0"/>
 *         &lt;element name="bound_value" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;choice>
 *           &lt;element name="context_variable_required" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;/choice>
 *         &lt;element name="context_argument" type="{http://storm.lia.ufc.br}context_argument_type" minOccurs="0"/>
 *         &lt;element name="context_variable_provided" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="context_variable_required_id" type="{http://www.w3.org/2001/XMLSchema}int"/>
 *       &lt;/sequence>
 *       &lt;attribute name="name" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="cp_id" type="{http://www.w3.org/2001/XMLSchema}int" />
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "context_parameter_type", propOrder = {
    "bound",
    "boundValue",
    "contextVariableRequired",
    "contextArgument",
    "contextVariableProvided",
    "contextVariableRequiredId"
})
public class ContextParameterType {

    protected ContextContract bound;
    @XmlElement(name = "bound_value", required = true)
    protected String boundValue;
    @XmlElement(name = "context_variable_required")
    protected String contextVariableRequired;
    @XmlElement(name = "context_argument")
    protected ContextArgumentType contextArgument;
    @XmlElement(name = "context_variable_provided")
    protected String contextVariableProvided;
    @XmlElement(name = "context_variable_required_id")
    protected int contextVariableRequiredId;
    @XmlAttribute(name = "name")
    protected String name;
    @XmlAttribute(name = "cp_id")
    protected Integer cpId;

    /**
     * Obtém o valor da propriedade bound.
     * 
     * @return
     *     possible object is
     *     {@link ContextContract }
     *     
     */
    public ContextContract getBound() {
        return bound;
    }

    /**
     * Define o valor da propriedade bound.
     * 
     * @param value
     *     allowed object is
     *     {@link ContextContract }
     *     
     */
    public void setBound(ContextContract value) {
        this.bound = value;
    }

    /**
     * Obtém o valor da propriedade boundValue.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getBoundValue() {
        return boundValue;
    }

    /**
     * Define o valor da propriedade boundValue.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setBoundValue(String value) {
        this.boundValue = value;
    }

    /**
     * Obtém o valor da propriedade contextVariableRequired.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getContextVariableRequired() {
        return contextVariableRequired;
    }

    /**
     * Define o valor da propriedade contextVariableRequired.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setContextVariableRequired(String value) {
        this.contextVariableRequired = value;
    }

    /**
     * Obtém o valor da propriedade contextArgument.
     * 
     * @return
     *     possible object is
     *     {@link ContextArgumentType }
     *     
     */
    public ContextArgumentType getContextArgument() {
        return contextArgument;
    }

    /**
     * Define o valor da propriedade contextArgument.
     * 
     * @param value
     *     allowed object is
     *     {@link ContextArgumentType }
     *     
     */
    public void setContextArgument(ContextArgumentType value) {
        this.contextArgument = value;
    }

    /**
     * Obtém o valor da propriedade contextVariableProvided.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getContextVariableProvided() {
        return contextVariableProvided;
    }

    /**
     * Define o valor da propriedade contextVariableProvided.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setContextVariableProvided(String value) {
        this.contextVariableProvided = value;
    }

    /**
     * Obtém o valor da propriedade contextVariableRequiredId.
     * 
     */
    public int getContextVariableRequiredId() {
        return contextVariableRequiredId;
    }

    /**
     * Define o valor da propriedade contextVariableRequiredId.
     * 
     */
    public void setContextVariableRequiredId(int value) {
        this.contextVariableRequiredId = value;
    }

    /**
     * Obtém o valor da propriedade name.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getName() {
        return name;
    }

    /**
     * Define o valor da propriedade name.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setName(String value) {
        this.name = value;
    }

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

}
