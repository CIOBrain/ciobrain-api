applicationAssetModel = require('../model/applicationAssetModel');
dataAssetModel = require('../model/dataAssetModel')
infrastructureAssetModel = require('../model/infrastructureAssetModel')
peopleAssetModel = require('../model/peopleAssetModel')
projectsAssetModel = require('../model/projectsAssetModel')
businessAssetModel = require('../model/businessAssetModel')
const assetFunctions = require('../assetFunctions');
XLSX = require('xlsx');

let businessAssetController = {
    
    findById: (req, res) => {
        res.json(businessAssetModel.findById(req.params.id));
    },
    findAll: (req, res) => {
        res.json(businessAssetModel.findAll());
    },
    findChildrenById: (req, res) => {
        let children = [];
        let parent = businessAssetModel.findById(req.params.id);
        parent["Asset Type"] = "Business";
        if (parent['Application Connections'] && parent['Application Connections'].trim().length) {
            let applicationAssetChildrenIds = parent['Application Connections'].split(';');
            applicationAssetChildrenIds = applicationAssetChildrenIds.map(item => parseInt(item.replace(/\D/g, '')));
            children = children.concat(assetFunctions.filterForValidApplicationChildren(parent, applicationAssetChildrenIds));
        }
        if (parent['Data Connections'] && parent['Data Connections'].trim().length) {
            let dataAssetChildrenIds = parent['Data Connections'].split(';');
            dataAssetChildrenIds = dataAssetChildrenIds.map(item => parseInt(item.replace(/\D/g, '')));
            children = children.concat(assetFunctions.filterForValidDataChildren(parent, dataAssetChildrenIds));
        }
        if (parent['Infrastructure Connections'] && parent['Infrastructure Connections'].trim().length) {
            let infrastructureAssetChildrenIds = parent['Infrastructure Connections'].split(';');
            infrastructureAssetChildrenIds = infrastructureAssetChildrenIds.map(item => parseInt(item.replace(/\D/g, '')));
            children = children.concat(assetFunctions.filterForValidInfrastructureChildren(parent, infrastructureAssetChildrenIds));
        }
        if (parent['People Connections'] && parent['People Connections'].trim().length) {
            let peopleAssetChildrenIds = parent['People Connections'].split(';');
            peopleAssetChildrenIds = peopleAssetChildrenIds.map(item => parseInt(item.replace(/\D/g, '')));
            children = children.concat(assetFunctions.filterForValidPeopleChildren(parent, peopleAssetChildrenIds));
        }
        if (parent['Projects Connections'] && parent['Projects Connections'].trim().length) {
            let projectsAssetChildrenIds = parent['Projects Connections'].split(';');
            projectsAssetChildrenIds = projectsAssetChildrenIds.map(item => parseInt(item.replace(/\D/g, '')));
            children = children.concat(assetFunctions.filterForValidProjectsChildren(parent, projectsAssetChildrenIds));
        }
        if (parent['Business Connections'] && parent['Business Connections'].trim().length) {
            let businessAssetChildrenIds = parent['Business Connections'].split(';');
            businessAssetChildrenIds = businessAssetChildrenIds.map(item => parseInt(item.replace(/\D/g, '')));
            children = children.concat(assetFunctions.filterForValidBusinessChildren(parent, businessAssetChildrenIds));
        }

        var hierarchy = {
            ...parent,
            children: children
        }

        res.json(hierarchy)
    }
}

module.exports = businessAssetController;