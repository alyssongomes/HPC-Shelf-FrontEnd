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
 * <p>Classe Java de abstract_component_type complex type.
 * 
 * <p>O seguinte fragmento do esquema especifica o conteúdo esperado contido dentro desta classe.
 * 
 * <pre>
 * &lt;complexType name="abstract_component_type">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="supertype" type="{http://storm.lia.ufc.br}abstract_component_type" minOccurs="0"/>
 *         &lt;element name="context_parameter" type="{http://storm.lia.ufc.br}context_parameter_type" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="inner_components" type="{http://storm.lia.ufc.br}abstract_component_type" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="abstract_unit" type="{http://storm.lia.ufc.br}abstract_unit_type" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="quality_parameters" type="{http://storm.lia.ufc.br}quality_parameter_type" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="cost_parameters" type="{http://storm.lia.ufc.br}cost_parameter_type" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="slices" type="{http://storm.lia.ufc.br}slice_type" maxOccurs="unbounded" minOccurs="0"/>
 *       &lt;/sequence>
 *       &lt;attribute name="name" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="kind" type="{http://storm.lia.ufc.br}kind_type" />
 *       &lt;attribute name="id_ac" type="{http://www.w3.org/2001/XMLSchema}int" />
 *       &lt;attribute name="path" type="{http://www.w3.org/2001/XMLSchema}string" />
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(propOrder = {
    "supertype",
    "contextParameter",
    "innerComponents",
    "abstractUnit",
    "qualityParameters",
    "costParameters",
    "slices"
})
@XmlRootElement(name="abstract_component")
public class AbstractComponentType {

    protected AbstractComponentType supertype;
    @XmlElement(name = "context_parameter")
    protected List<ContextParameterType> contextParameter;
    @XmlElement(name = "inner_components")
    protected List<AbstractComponentType> innerComponents;
    @XmlElement(name = "abstract_unit")
    protected List<AbstractUnitType> abstractUnit;
    @XmlElement(name = "quality_parameters")
    protected List<QualityParameterType> qualityParameters;
    @XmlElement(name = "cost_parameters")
    protected List<CostParameterType> costParameters;
    protected List<SliceType> slices;
    @XmlAttribute(name = "name")
    protected String name;
    @XmlAttribute(name = "kind")
    protected Integer kind;
    @XmlAttribute(name = "id_ac")
    protected Integer idAc;
    @XmlAttribute(name = "path")
    protected String path;

    /**
     * Obtém o valor da propriedade supertype.
     * 
     * @return
     *     possible object is
     *     {@link AbstractComponentType }
     *     
     */
    public AbstractComponentType getSupertype() {
        return supertype;
    }

    /**
     * Define o valor da propriedade supertype.
     * 
     * @param value
     *     allowed object is
     *     {@link AbstractComponentType }
     *     
     */
    public void setSupertype(AbstractComponentType value) {
        this.supertype = value;
    }

    /**
     * Gets the value of the contextParameter property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the contextParameter property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getContextParameter().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link ContextParameterType }
     * 
     * 
     */
    public List<ContextParameterType> getContextParameter() {
        if (contextParameter == null) {
            contextParameter = new ArrayList<ContextParameterType>();
        }
        return this.contextParameter;
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
     * {@link AbstractComponentType }
     * 
     * 
     */
    public List<AbstractComponentType> getInnerComponents() {
        if (innerComponents == null) {
            innerComponents = new ArrayList<AbstractComponentType>();
        }
        return this.innerComponents;
    }

    /**
     * Gets the value of the abstractUnit property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the abstractUnit property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getAbstractUnit().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link AbstractUnitType }
     * 
     * 
     */
    public List<AbstractUnitType> getAbstractUnit() {
        if (abstractUnit == null) {
            abstractUnit = new ArrayList<AbstractUnitType>();
        }
        return this.abstractUnit;
    }

    /**
     * Gets the value of the qualityParameters property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the qualityParameters property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getQualityParameters().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link QualityParameterType }
     * 
     * 
     */
    public List<QualityParameterType> getQualityParameters() {
        if (qualityParameters == null) {
            qualityParameters = new ArrayList<QualityParameterType>();
        }
        return this.qualityParameters;
    }

    /**
     * Gets the value of the costParameters property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the costParameters property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getCostParameters().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link CostParameterType }
     * 
     * 
     */
    public List<CostParameterType> getCostParameters() {
        if (costParameters == null) {
            costParameters = new ArrayList<CostParameterType>();
        }
        return this.costParameters;
    }

    /**
     * Gets the value of the slices property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the slices property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getSlices().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link SliceType }
     * 
     * 
     */
    public List<SliceType> getSlices() {
        if (slices == null) {
            slices = new ArrayList<SliceType>();
        }
        return this.slices;
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

    /**
     * Obtém o valor da propriedade idAc.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getIdAc() {
        return idAc;
    }

    /**
     * Define o valor da propriedade idAc.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setIdAc(Integer value) {
        this.idAc = value;
    }

    /**
     * Obtém o valor da propriedade path.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPath() {
        return path;
    }

    /**
     * Define o valor da propriedade path.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPath(String value) {
        this.path = value;
    }

}
