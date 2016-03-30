//
// Este arquivo foi gerado pela Arquitetura JavaTM para Implementação de Referência (JAXB) de Bind XML, v2.2.8-b130911.1802 
// Consulte <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Todas as modificações neste arquivo serão perdidas após a recompilação do esquema de origem. 
// Gerado em: 2016.01.19 às 07:30:36 PM BRT 
//


package br.ufc.front.model.mapping;

import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Classe Java de context_contract complex type.
 * 
 * <p>O seguinte fragmento do esquema especifica o conteúdo esperado contido dentro desta classe.
 * 
 * <pre>
 * &lt;complexType name="context_contract">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="context_arguments" type="{http://storm.lia.ufc.br}context_argument_type" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="abstract_component" type="{http://storm.lia.ufc.br}abstract_component_type"/>
 *         &lt;element name="platform" type="{http://storm.lia.ufc.br}context_contract" minOccurs="0"/>
 *         &lt;element name="quality_arguments" type="{http://storm.lia.ufc.br}quality_argument_type" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="ranking_arguments" type="{http://storm.lia.ufc.br}ranking_argument_type" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="cost_arguments" type="{http://storm.lia.ufc.br}cost_argument_type" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;choice>
 *           &lt;element name="inner_components_resolved" type="{http://storm.lia.ufc.br}candidate_list_type" maxOccurs="unbounded" minOccurs="0"/>
 *           &lt;element name="inner_components" type="{http://storm.lia.ufc.br}context_contract" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;/choice>
 *       &lt;/sequence>
 *       &lt;attribute name="cc_name" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="cc_id" type="{http://www.w3.org/2001/XMLSchema}int" />
 *       &lt;attribute name="owner_id" type="{http://www.w3.org/2001/XMLSchema}int" />
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(propOrder = {
    "contextArguments",
    "abstractComponent",
    "platform",
    "qualityArguments",
    "rankingArguments",
    "costArguments",
    "innerComponentsResolved",
    "innerComponents"
})
@XmlRootElement(name = "context_contract")
public class ContextContract {

    @XmlElement(name = "context_arguments")
    protected List<ContextArgumentType> contextArguments;
    @XmlElement(name = "abstract_component", required = true)
    protected AbstractComponentType abstractComponent;
    protected ContextContract platform;
    @XmlElement(name = "quality_arguments")
    protected List<QualityArgumentType> qualityArguments;
    @XmlElement(name = "ranking_arguments")
    protected List<RankingArgumentType> rankingArguments;
    @XmlElement(name = "cost_arguments")
    protected List<CostArgumentType> costArguments;
    @XmlElement(name = "inner_components_resolved")
    protected List<CandidateListType> innerComponentsResolved;
    @XmlElement(name = "inner_components")
    protected List<ContextContract> innerComponents;
    @XmlAttribute(name = "cc_name")
    protected String ccName;
    @XmlAttribute(name = "cc_id")
    protected Integer ccId;
    @XmlAttribute(name = "owner_id")
    protected Integer ownerId;

    /**
     * Gets the value of the contextArguments property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the contextArguments property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getContextArguments().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link ContextArgumentType }
     * 
     * 
     */
    public List<ContextArgumentType> getContextArguments() {
        if (contextArguments == null) {
            contextArguments = new ArrayList<ContextArgumentType>();
        }
        return this.contextArguments;
    }

    /**
     * Obtém o valor da propriedade abstractComponent.
     * 
     * @return
     *     possible object is
     *     {@link AbstractComponentType }
     *     
     */
    public AbstractComponentType getAbstractComponent() {
        return abstractComponent;
    }

    /**
     * Define o valor da propriedade abstractComponent.
     * 
     * @param value
     *     allowed object is
     *     {@link AbstractComponentType }
     *     
     */
    public void setAbstractComponent(AbstractComponentType value) {
        this.abstractComponent = value;
    }

    /**
     * Obtém o valor da propriedade platform.
     * 
     * @return
     *     possible object is
     *     {@link ContextContract }
     *     
     */
    public ContextContract getPlatform() {
        return platform;
    }

    /**
     * Define o valor da propriedade platform.
     * 
     * @param value
     *     allowed object is
     *     {@link ContextContract }
     *     
     */
    public void setPlatform(ContextContract value) {
        this.platform = value;
    }

    /**
     * Gets the value of the qualityArguments property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the qualityArguments property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getQualityArguments().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link QualityArgumentType }
     * 
     * 
     */
    public List<QualityArgumentType> getQualityArguments() {
        if (qualityArguments == null) {
            qualityArguments = new ArrayList<QualityArgumentType>();
        }
        return this.qualityArguments;
    }

    /**
     * Gets the value of the rankingArguments property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the rankingArguments property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getRankingArguments().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link RankingArgumentType }
     * 
     * 
     */
    public List<RankingArgumentType> getRankingArguments() {
        if (rankingArguments == null) {
            rankingArguments = new ArrayList<RankingArgumentType>();
        }
        return this.rankingArguments;
    }

    /**
     * Gets the value of the costArguments property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the costArguments property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getCostArguments().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link CostArgumentType }
     * 
     * 
     */
    public List<CostArgumentType> getCostArguments() {
        if (costArguments == null) {
            costArguments = new ArrayList<CostArgumentType>();
        }
        return this.costArguments;
    }

    /**
     * Gets the value of the innerComponentsResolved property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the innerComponentsResolved property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getInnerComponentsResolved().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link CandidateListType }
     * 
     * 
     */
    public List<CandidateListType> getInnerComponentsResolved() {
        if (innerComponentsResolved == null) {
            innerComponentsResolved = new ArrayList<CandidateListType>();
        }
        return this.innerComponentsResolved;
    }

    /**
     * Gets the value of the innerComponents property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the innerComponents property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getInnerComponents().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link ContextContract }
     * 
     * 
     */
    public List<ContextContract> getInnerComponents() {
        if (innerComponents == null) {
            innerComponents = new ArrayList<ContextContract>();
        }
        return this.innerComponents;
    }

    /**
     * Obtém o valor da propriedade ccName.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCcName() {
        return ccName;
    }

    /**
     * Define o valor da propriedade ccName.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCcName(String value) {
        this.ccName = value;
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
     * Obtém o valor da propriedade ownerId.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getOwnerId() {
        return ownerId;
    }

    /**
     * Define o valor da propriedade ownerId.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setOwnerId(Integer value) {
        this.ownerId = value;
    }

}
