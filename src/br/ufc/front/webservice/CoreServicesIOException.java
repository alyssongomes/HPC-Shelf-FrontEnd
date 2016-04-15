
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
 *         &lt;element name="IOException" type="{http://io.java/xsd}IOException" minOccurs="0"/>
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
    "ioException"
})
@XmlRootElement(name = "CoreServicesIOException")
public class CoreServicesIOException {

    @XmlElementRef(name = "IOException", namespace = "http://webservices.storm.ufc.br", type = JAXBElement.class, required = false)
    protected JAXBElement<IOException> ioException;

    /**
     * Obtém o valor da propriedade ioException.
     * 
     * @return
     *     possible object is
     *     {@link JAXBElement }{@code <}{@link IOException }{@code >}
     *     
     */
    public JAXBElement<IOException> getIOException() {
        return ioException;
    }

    /**
     * Define o valor da propriedade ioException.
     * 
     * @param value
     *     allowed object is
     *     {@link JAXBElement }{@code <}{@link IOException }{@code >}
     *     
     */
    public void setIOException(JAXBElement<IOException> value) {
        this.ioException = value;
    }

}
