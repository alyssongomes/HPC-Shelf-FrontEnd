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
 * <p>Classe Java de abstract_unit_type complex type.
 * 
 * <p>O seguinte fragmento do esquema especifica o conteúdo esperado contido dentro desta classe.
 * 
 * <pre>
 * &lt;complexType name="abstract_unit_type">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;attribute name="au_name" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="ac_id" type="{http://www.w3.org/2001/XMLSchema}int" />
 *       &lt;attribute name="au_id" type="{http://www.w3.org/2001/XMLSchema}int" />
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "abstract_unit_type")
public class AbstractUnitType {

    @XmlAttribute(name = "au_name")
    protected String auName;
    @XmlAttribute(name = "ac_id")
    protected Integer acId;
    @XmlAttribute(name = "au_id")
    protected Integer auId;

    /**
     * Obtém o valor da propriedade auName.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAuName() {
        return auName;
    }

    /**
     * Define o valor da propriedade auName.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAuName(String value) {
        this.auName = value;
    }

    /**
     * Obtém o valor da propriedade acId.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getAcId() {
        return acId;
    }

    /**
     * Define o valor da propriedade acId.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setAcId(Integer value) {
        this.acId = value;
    }

    /**
     * Obtém o valor da propriedade auId.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getAuId() {
        return auId;
    }

    /**
     * Define o valor da propriedade auId.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setAuId(Integer value) {
        this.auId = value;
    }

}
