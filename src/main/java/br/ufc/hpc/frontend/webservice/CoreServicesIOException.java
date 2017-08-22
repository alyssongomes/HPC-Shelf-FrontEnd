
package br.ufc.hpc.frontend.webservice;

import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElementRef;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for anonymous complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
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
     * Gets the value of the ioException property.
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
     * Sets the value of the ioException property.
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
