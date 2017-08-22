var org_example_instantiator = {
  name: 'org_example_instantiator',
  defaultElementNamespaceURI: 'http:\/\/www.example.org\/instantiator',
  typeInfos: [{
      type: 'classInfo',
      localName: 'InstanceType',
      propertyInfos: [{
          type: 'element',
          name: 'contextualType',
          elementName: 'contextual_type',
          typeInfo: 'org_example_instantiator.ComponentFunctorApplicationType'
        }, {
          type: 'element',
          name: 'unitMapping',
          collection: true,
          elementName: 'unit_mapping',
          typeInfo: 'org_example_instantiator.UnitMappingType'
        }, {
          type: 'element',
          name: 'facetAddress',
          collection: true,
          elementName: 'facet_address',
          typeInfo: 'org_example_instantiator.FacetAddressType'
        }, {
          name: 'instanceRef',
          typeInfo: 'String',
          attributeName: 'instance_ref',
          type: 'attribute'
        }]
    }, {
      type: 'classInfo',
      localName: 'ComponentFunctorApplicationType',
      propertyInfos: [{
          type: 'element',
          name: 'argument',
          collection: true,
          elementName: 'argument',
          typeInfo: 'org_example_instantiator.ContextArgumentType'
        }, {
          name: 'componentRef',
          typeInfo: 'String',
          attributeName: 'component_ref',
          type: 'attribute'
        }]
    }, {
      type: 'classInfo',
      localName: 'NodeMappingType',
      propertyInfos: [{
          name: 'unitId',
          typeInfo: 'String',
          attributeName: 'unit_id',
          type: 'attribute'
        }, {
          name: 'unitIndex',
          typeInfo: 'Int',
          attributeName: 'unit_index',
          type: 'attribute'
        }, {
          name: 'node',
          typeInfo: 'Int',
          attributeName: 'node',
          type: 'attribute'
        }]
    }, {
      type: 'classInfo',
      localName: 'UnitMappingType',
      propertyInfos: [{
          type: 'element',
          name: 'node',
          collection: true,
          elementName: 'node',
          typeInfo: 'Int'
        }, {
          name: 'unitId',
          typeInfo: 'String',
          attributeName: 'unit_id',
          type: 'attribute'
        }, {
          name: 'unitIndex',
          typeInfo: 'Int',
          attributeName: 'unit_index',
          type: 'attribute'
        }]
    }, {
      type: 'classInfo',
      localName: 'ContextArgumentType',
      propertyInfos: [{
          type: 'element',
          name: 'type',
          elementName: 'type',
          typeInfo: 'org_example_instantiator.ComponentFunctorApplicationType'
        }, {
          type: 'element',
          name: 'variable',
          elementName: 'variable',
          typeInfo: 'String'
        }, {
          name: 'parameterId',
          typeInfo: 'String',
          attributeName: 'parameter_id',
          type: 'attribute'
        }]
    }, {
      type: 'classInfo',
      localName: 'FacetAddressType',
      propertyInfos: [{
          name: 'address',
          typeInfo: 'String',
          attributeName: 'address',
          type: 'attribute'
        }, {
          name: 'port',
          typeInfo: 'Int',
          attributeName: 'port',
          type: 'attribute'
        }]
    }, {
      type: 'classInfo',
      localName: 'ContextParameterType',
      propertyInfos: [{
          type: 'element',
          name: 'argument',
          elementName: 'argument',
          typeInfo: 'org_example_instantiator.ContextArgumentType'
        }, {
          name: 'parameterId',
          typeInfo: 'String',
          attributeName: 'parameter_id',
          type: 'attribute'
        }]
    }],
  elementInfos: [{
      elementName: 'application',
      typeInfo: 'org_example_instantiator.InstanceType'
    }]
};
if (typeof require === 'function') {
  module.exports.org_example_instantiator = org_example_instantiator;
}