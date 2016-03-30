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
 * <p>Classe Java de cost_parameter_type complex type.
 * 
 * <p>O seguinte fragmento do esquema especifica o conteúdo esperado contido dentro desta classe.
 * 
 * <pre>
 * &lt;complexType name="cost_parameter_type">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="cost_argument" type="{http://storm.lia.ufc.br}cost_argument_type" minOccurs="0"/>
 *       &lt;/sequence>
 *       &lt;attribute name="name" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="cop_id" type="{http://www.w3.org/2001/XMLSchema}int" />
 *       &lt;attribute name="kind_id" type="{http://www.w3.org/2001/XMLSchema}int" />
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "cost_parameter_type", propOrder = {
    "costArgument"
})
public class CostParameterType {

    @XmlElement(name = "cost_argument")
    protected CostArgumentType costArgument;
    @XmlAttribute(name = "name")
    protected String name;
    @XmlAttribute(name = "cop_id")
    protected Integer copId;
    @XmlAttribute(name = "kind_id")
    protected Integer kindId;

    /**
     * Obtém o valor da propriedade costArgument.
     * 
     * @return
     *     possible object is
     *     {@link CostArgumentType }
     *     
     */
    public CostArgumentType getCostArgument() {
        return costArgument;
    }

    /**
     * Define o valor da propriedade costArgument.
     * 
     * @param value
     *     allowed object is
     *     {@link CostArgumentType }
     *     
     */
    public void setCostArgument(CostArgumentType value) {
        this.costArgument = value;
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
     * Obtém o valor da propriedade copId.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getCopId() {
        return copId;
    }

    /**
     * Define o valor da propriedade copId.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setCopId(Integer value) {
        this.copId = value;
    }

    /**
     * Obtém o valor da propriedade kindId.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getKindId() {
        return kindId;
    }

    /**
     * Define o valor da propriedade kindId.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setKindId(Integer value) {
        this.kindId = value;
    }

}
