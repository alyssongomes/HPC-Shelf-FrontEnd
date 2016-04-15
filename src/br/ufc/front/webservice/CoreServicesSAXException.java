
package br.ufc.front.webservice;

import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElementRef;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Classe Java de anonymous complex type.
 * 
 * <p>O seguinte fragmento do esquema especifica o conteúdo esperado contido dentro desta classe.
 * 
 * <pre>
 * &lt;complexType>
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="SAXException" type="{http://sax.xml.org/xsd}SAXException" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "saxException"
})
@XmlRootElement(name = "CoreServicesSAXException")
public class CoreServicesSAXException {

    @XmlElementRef(name = "SAXException", namespace = "http://webservices.storm.ufc.br", type = JAXBElement.class, required = false)
    protected JAXBElement<SAXException> saxException;

    /**
     * Obtém o valor da propriedade saxException.
     * 
     * @return
     *     possible object is
     *     {@link JAXBElement }{@code <}{@link SAXException }{@code >}
     *     
     */
    public JAXBElement<SAXException> getSAXException() {
        return saxException;
    }

    /**
     * Define o valor da propriedade saxException.
     * 
     * @param value
     *     allowed object is
     *     {@link JAXBElement }{@code <}{@link SAXException }{@code >}
     *     
     */
    public void setSAXException(JAXBElement<SAXException> value) {
        this.saxException = value;
    }

}
