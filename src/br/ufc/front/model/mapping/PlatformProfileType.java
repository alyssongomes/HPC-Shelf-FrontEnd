//
// Este arquivo foi gerado pela Arquitetura JavaTM para Implementação de Referência (JAXB) de Bind XML, v2.2.8-b130911.1802 
// Consulte <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Todas as modificações neste arquivo serão perdidas após a recompilação do esquema de origem. 
// Gerado em: 2016.01.19 às 07:30:36 PM BRT 
//


package br.ufc.front.model.mapping;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Classe Java de platform_profile_type complex type.
 * 
 * <p>O seguinte fragmento do esquema especifica o conteúdo esperado contido dentro desta classe.
 * 
 * <pre>
 * &lt;complexType name="platform_profile_type">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="platform_contract" type="{http://storm.lia.ufc.br}context_contract"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "platform_profile_type", propOrder = {
    "platformContract"
})
public class PlatformProfileType {

    @XmlElement(name = "platform_contract", required = true)
    protected ContextContract platformContract;

    /**
     * Obtém o valor da propriedade platformContract.
     * 
     * @return
     *     possible object is
     *     {@link ContextContract }
     *     
     */
    public ContextContract getPlatformContract() {
        return platformContract;
    }

    /**
     * Define o valor da propriedade platformContract.
     * 
     * @param value
     *     allowed object is
     *     {@link ContextContract }
     *     
     */
    public void setPlatformContract(ContextContract value) {
        this.platformContract = value;
    }

}
