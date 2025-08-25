// import { Component, OnInit } from '@angular/core';
// import mapboxgl  from 'mapbox-gl';
// import { UserService } from '../../../user/profile/user.service';
//
// @Component({
//     selector: 'app-carteclients',
//     templateUrl: './carteclients.component.html',
//     styleUrls: ['./carteclients.component.scss']
// })
// export class CarteclientsComponent implements OnInit {
//     map!: mapboxgl.Map;
//
//     constructor(private userService: UserService) {}
//
//     ngOnInit(): void {
//         this.initMap();
//         this.loadClients();
//     }
//
//     private initMap(): void {
//         (mapboxgl as any).accessToken = 'VOTRE_MAPBOX_ACCESS_TOKEN'; // remplace par ta clé Mapbox
//
//         this.map = new mapboxgl.Map({
//             container: 'map', // div id
//             style: 'mapbox://styles/mapbox/streets-v11',
//             center: [10.2, 36.8], // longitude, latitude
//             zoom: 6
//         });
//
//         this.map.addControl(new mapboxgl.NavigationControl()); // zoom + orientation
//     }
//
//     private loadClients(): void {
//         this.userService.getAllClients().subscribe(clients => {
//             clients.forEach(client => {
//                 if (client.latitude && client.longitude) {
//                     const popup = new mapboxgl.Popup({ offset: 25 })
//                         .setHTML(`<b>${client.username}</b>`);
//
//                     new mapboxgl.Marker()
//                         .setLngLat([client.longitude, client.latitude])
//                         .setPopup(popup)
//                         .addTo(this.map);
//                 }
//             });
//         }, err => {
//             console.error('Erreur lors du chargement des clients :', err);
//         });
//     }
// }
